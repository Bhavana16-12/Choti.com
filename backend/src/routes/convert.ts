import { Router, Request, Response } from 'express';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';
import { upload } from '../middleware/upload';
import { cleanupFile } from '../utils/cleanup';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const router = Router();

const tempOutDir = path.join(__dirname, '../../temp/downloads');
if (!fs.existsSync(tempOutDir)) {
  fs.mkdirSync(tempOutDir, { recursive: true });
}

router.post('/mp4-to-mp3', upload.single('file'), (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

  const quality = req.body.quality || '192'; // default to 192 kbps
  const inputFilePath = req.file.path;
  const outputFileName = `converted-${Date.now()}.mp3`;
  const outputFilePath = path.join(tempOutDir, outputFileName);

  console.log(`Starting conversion for ${inputFilePath} to ${quality} kbps`);

  ffmpeg(inputFilePath)
    .toFormat('mp3')
    .audioBitrate(quality)
    .on('end', () => {
      console.log('Conversion complete');
      
      // Cleanup input file
      cleanupFile(inputFilePath);

      // Return the filename so the frontend can download it via GET
      res.json({ filename: outputFileName });
    })
    .on('error', (err) => {
      console.error('Error converting file:', err);
      cleanupFile(inputFilePath);
      res.status(500).json({ error: 'Something went wrong while processing your file. Please try again.' });
    })
    .save(outputFilePath);
});

// New GET endpoint to actually trigger the native download
router.get('/download', (req: Request, res: Response): void => {
  const filename = req.query.filename as string;
  if (!filename) {
    res.status(400).json({ error: 'Filename is required' });
    return;
  }

  const filePath = path.join(tempOutDir, filename);
  
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'audio/mpeg');
    
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
    
    fileStream.on('end', () => cleanupFile(filePath));
    fileStream.on('error', (err) => {
      console.error('Error streaming file:', err);
      cleanupFile(filePath);
      if (!res.headersSent) res.status(500).end();
    });
    req.on('close', () => cleanupFile(filePath));
  } else {
    res.status(404).json({ error: 'File not found or expired.' });
  }
});

export default router;

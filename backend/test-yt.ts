import { create } from 'youtube-dl-exec';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

const youtubedl = create('yt-dlp');

youtubedl('https://youtube.com/shorts/uJtkLu5UGe8?si=d-69j9NYiLaiMKW2', {
  output: 'test-yt-merge.mp4',
  forceIpv4: true,
  noPlaylist: true,
  ffmpegLocation: ffmpegInstaller.path,
  format: 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
  mergeOutputFormat: 'mp4'
}).then(output => console.log('Success'))
  .catch(err => console.error(err));

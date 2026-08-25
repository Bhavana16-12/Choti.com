import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

import convertRouter from './routes/convert';
import downloadRouter from './routes/download';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/convert', convertRouter);
app.use('/api/download', downloadRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

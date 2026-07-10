import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { connect } from './db.js';

const app = express();
const port = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use('/api', express.Router()
  .get('/status', async (req, res) => {
    try {
      const db = await connect();
      const stats = await db.command({ ping: 1 });
      return res.json({ message: 'Backend is online', mongo: stats.ok === 1 });
    } catch (error) {
      console.error('MongoDB connection error:', error);
      return res.status(500).json({ message: 'Backend is online, MongoDB unavailable' });
    }
  })
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
  });
}

app.listen(port, async () => {
  try {
    await connect();
  } catch (error) {
    console.error('Failed to connect to MongoDB on startup:', error);
  }
  console.log(`Mama Uhai backend listening on port ${port}`);
});

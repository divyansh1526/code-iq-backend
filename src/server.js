import express from 'express';
import cors from 'cors';
import { serve } from 'inngest/express';

import { ENV } from './lib/env.js';
import { connectDB } from './lib/db.js';
import { inngest, functions } from './lib/inngest.js';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: ENV.CLIENT_URL,
  credentials: true
}));

app.use('/api/inngest', serve({ client: inngest, functions }));

app.get('/api', (req, res) => {
  res.json({ msg: 'hello' });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();

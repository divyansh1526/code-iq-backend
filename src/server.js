import express from 'express';
import cors from 'cors';
import {ENV} from './lib/env.js';
import path from 'path';
import { connectDB } from './lib/db.js';
import {serve} from 'inngest/express';
import {inngest, functions} from './lib/inngest.js';


const app = express();
const PORT = ENV.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cors({origin:ENV.CLIENT_URL, credentials: true}));

app.use('/api/inngest', serve({client: inngest, functions}));

app.get('/api', (req, res) => {
  res.json({msg: 'hello'});
});

app.get('/book', (req, res) => {
  res.json({msg: 'hi'});
});

if(ENV.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  });
}

const startserver = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startserver();


"use strict";
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import taskRoutes from './routes/task.routes.js';
const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api', taskRoutes)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

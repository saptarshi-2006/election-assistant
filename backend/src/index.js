import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import voterRoutes from './routes/voter.routes.js';
import bloRoutes from './routes/blo.routes.js';
import chatRoutes from './routes/chat.routes.js';
import translateRoutes from './routes/translate.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/v1/auth', authRoutes);
app.use('/v1/voter', voterRoutes);
app.use('/v1/blo', bloRoutes);
app.use('/v1/chat', chatRoutes);
app.use('/v1/translate', translateRoutes);

// Seed route for testing
import { seedDatabase } from './controllers/seed.controller.js';
app.post('/v1/seed', seedDatabase);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Nirvachan Sahayika API is running' });
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

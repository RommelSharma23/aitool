// src/app.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import toolRoutes from './routes/toolRoutes';
import categoryRoutes from './routes/categoryRoutes';
import errorHandler from './middleware/errorHandler';  // Changed to default import

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tools', toolRoutes);
app.use('/api/categories', categoryRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Health check available at http://localhost:${port}/health`);
  console.log(`API endpoints:`);
  console.log(`- GET /api/tools`);
  console.log(`- GET /api/categories`);
});

export default app;
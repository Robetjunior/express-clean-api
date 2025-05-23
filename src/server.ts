import express from 'express';
import dotenv from 'dotenv';
import routes from './interfaces/http/routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api', routes);

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;

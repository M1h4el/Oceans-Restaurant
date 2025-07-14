import express from 'express';
import cors from 'cors';
import menuRouter from './routes/menu.router';
import invoiceRouter from './routes/invoice.router';
import authRouter from './routes/auth';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173' // Puerto de tu frontend
}));
app.use(express.json());

app.use('/api/menu', menuRouter);
app.use('/api/invoices', invoiceRouter);
app.use('/api/auth', authRouter);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

export default app;
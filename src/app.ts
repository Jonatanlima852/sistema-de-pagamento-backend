import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import userRoutes from './routes/user.routes';
import accountRoutes from './routes/accounts.routes';
import categoryRoutes from './routes/categories.routes';
import transactionsRoutes from './routes/transactions.routes';
import { swaggerOptions } from './config/swagger.config';
import { errorHandler } from './middlewares/error.middleware';


const app = express();
const swaggerDocs = swaggerJsdoc(swaggerOptions);


app.use(helmet()); // Middleware de segurança - protege a API contra algumas vulnerabilidades comuns
app.use(cors()); // Middleware de segurança - habilita acesso a API de outras origens
app.use(express.json()); // Middleware de parseamento de JSON
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Middleware de documentação
app.use('/api', userRoutes); //Middleware de rotas
app.use('/api', accountRoutes); 
app.use('/api', categoryRoutes); 
app.use('/api', transactionsRoutes); 
app.use(errorHandler);   // Middleware de tratamento de erros


export default app;
import { userSwaggerDocs } from '../docs/user.swagger';
import { accountSwaggerDocs } from '../docs/account.swagger';
import { categorySwaggerDocs } from '../docs/category.swagger';

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentação da API de Usuários',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    paths: {
      ...userSwaggerDocs,
      ...accountSwaggerDocs,
      ...categorySwaggerDocs,
    }
  },
  apis: []
}; 


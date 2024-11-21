import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface JwtPayload {
  userId: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        name: string;
      };
    }
  } 
} 
// Declaração de extensão do Express para adicionar a propriedade user ao Request
// Assim, podemos acessar o usuário autenticado em qualquer rota que tenha o middleware de autenticação

export const authenticate: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ error: 'Token não fornecido' });
      return ;
    }

    const [, token] = authHeader.split(' '); // O token vem como Bearer <token>

    if (!token) {
      res.status(401).json({ error: 'Token mal formatado' });
      return ;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          name: true,
        },
      });

      if (!user) {
        res.status(401).json({ error: 'Usuário não encontrado' });
        return ;
      }

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
}; 
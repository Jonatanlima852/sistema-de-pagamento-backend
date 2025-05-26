// src/config/transporter.ts
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configuração do transporter usando SMTP do Mailtrap
export const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 587,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

// Verifica se a conexão com o Mailtrap está funcionando
transporter.verify((error, success) => {
  if (error) {
    console.error('Erro ao conectar com Mailtrap:', error);
  } else {
    console.log('Conectado ao Mailtrap com sucesso');
  }
});

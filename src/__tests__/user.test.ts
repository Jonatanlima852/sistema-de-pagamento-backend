import request from 'supertest';
import app from '../app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('User Controller', () => {
  let token: string;
  let userId: number;

  beforeAll(async () => {
    await prisma.transaction.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.account.deleteMany({});
    await prisma.user.deleteMany({});
  });

  afterAll(async () => {
    await prisma.transaction.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.account.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.$disconnect();
  });

  test('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        email: `create${Date.now()}@example.com`,
        password: 'Password123',
        name: 'Test User'
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toContain('@example.com');
  });

  test('should not create a user with invalid data', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        email: 'invalid-email',
        password: 'short',
        name: ''
      });
    expect(response.status).toBe(400);
  });

  test('should login a user', async () => {
    const email = `login${Date.now()}@example.com`;

    await request(app)
      .post('/api/users')
      .send({
        email: email,
        password: 'Password123',
        name: 'Login User'
      });

    const response = await request(app)
      .post('/api/login')
      .send({
        email: email,
        password: 'Password123'
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('should get the user profile', async () => {
    const email = `getme${Date.now()}@example.com`;

    const userResponse = await request(app)
      .post('/api/users')
      .send({
        email: email,
        password: 'Password123',
        name: 'Profile User'
      });

    const loginResponse = await request(app)
      .post('/api/login')
      .send({
        email: email,
        password: 'Password123'
      });

    const Token = loginResponse.body.token;

    const profileResponse = await request(app)
      .get('/api/me')
      .set('Authorization', `Bearer ${Token}`);
    expect(profileResponse.status).toBe(200);
    expect(profileResponse.body.email).toBe(email);
  });

  test('should update the user profile', async () => {
    const userResponse = await request(app)
      .post('/api/users')
      .send({
        email: `updateUser@example.com`,
        password: 'Password123',
        name: 'Test User'
      });

    const loginResponse = await request(app)
      .post('/api/login')
      .send({
        email: `updateUser@example.com`,
        password: 'Password123'
      });

    token = loginResponse.body.token;

    const newName = 'Updated User';
    const newEmail = `updated${Date.now()}@example.com`;
    const newPassword = 'Newpassword123';

    const response = await request(app)
      .put('/api/me')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: newName,
        email: newEmail,
        password: newPassword
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(newName);
    expect(response.body.email).toBe(newEmail);
  });

  test('should delete the user', async () => {
    const userResponse = await request(app)
      .post('/api/users')
      .send({
        email: `deleteUser@example.com`,
        password: 'Password123',
        name: 'Test User'
      });

    userId = userResponse.body.id;

    const loginResponse = await request(app)
      .post('/api/login')
      .send({
        email: `deleteUser@example.com`,
        password: 'Password123'
      });

    token = loginResponse.body.token;

    const response = await request(app)
      .delete('/api/me')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    expect(user).toBeNull();
  });
});
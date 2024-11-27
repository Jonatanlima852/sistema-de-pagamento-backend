import request from 'supertest';
import app from '../app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Account Controller', () => {
  let userId: number;
  let token: string;

  beforeAll(async () => {
    await prisma.transaction.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.account.deleteMany({});
    await prisma.user.deleteMany({});

    const email = `account@example.com`;

    const userResponse = await request(app)
      .post('/api/users')
      .send({
        email: email,
        password: 'Password123',
        name: 'Test User'
      });

    userId = userResponse.body.id;

    const loginResponse = await request(app)
      .post('/api/login')
      .send({
        email: email,
        password: 'Password123'
      });

    token = loginResponse.body.token;
  });

  afterAll(async () => {
    await prisma.transaction.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.account.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.$disconnect();
  });

  test('should create a new account', async () => {
    const response = await request(app)
      .post('/api/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Account',
        type: 'CASH',
        balance: 1000
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Test Account');
    expect(response.body.balance).toBe("1000");
  });

  test('should get all accounts', async () => {
    
    await request(app)
      .post('/api/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Another Test Account',
        type: 'CASH',
        balance: 500
      });

    const response = await request(app)
      .get('/api/accounts')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('should get a single account', async () => {
    
    const createResponse = await request(app)
      .post('/api/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Single Account',
        type: 'CASH',
        balance: 500
      });

    const accountId = createResponse.body.id;

    const response = await request(app)
      .get(`/api/accounts/${accountId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Single Account');
    expect(response.body.balance).toBe("500");
  });

  test('should update an account', async () => {
    
    const createResponse = await request(app)
      .post('/api/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Update Account',
        type: 'CREDIT_CARD',
        balance: 2000
      });

    const accountId = createResponse.body.id;

    const response = await request(app)
      .put(`/api/accounts/${accountId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Account',
        balance: 2500
      });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Account');
    expect(response.body.balance).toBe("2500");
  });

  test('should delete an account', async () => {
    
    const createResponse = await request(app)
      .post('/api/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Delete Account',
        type: 'CASH',
        balance: 300
      });

    const accountId = createResponse.body.id;

    const response = await request(app)
      .delete(`/api/accounts/${accountId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(204);
  });
});
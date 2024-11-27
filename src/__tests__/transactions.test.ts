import request from 'supertest';
import app from '../app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Transactions Controller', () => {
  let userId: number;
  let token: string;
  let accountId: number;
  let categoryId: number;
  const testEmail = `transactions${Date.now()}@example.com`;

  beforeAll(async () => {
    await prisma.transaction.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.account.deleteMany({});
    await prisma.user.deleteMany({});

    const userResponse = await request(app)
      .post('/api/users')
      .send({
        email: testEmail,
        password: 'Password123',
        name: 'Test User'
      });

    userId = userResponse.body.id;

    const loginResponse = await request(app)
      .post('/api/login')
      .send({
        email: testEmail,
        password: 'Password123'
      });

    token = loginResponse.body.token;

    const accountResponse = await request(app)
      .post('/api/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Account',
        type: 'CASH',
        balance: 1000
      });

    accountId = accountResponse.body.id;

    const categoryResponse = await request(app)
      .post('/api/categories')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Category',
        type: 'INCOME'
      });

    categoryId = categoryResponse.body.id;
  });

  afterAll(async () => {
    await prisma.transaction.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.account.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.$disconnect();
  });

  test('should create a new transaction', async () => {
    const response = await request(app)
      .post('/api/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Test Transaction',
        amount: 100,
        date: new Date(),
        type: 'INCOME',
        isRecurring: false,
        categoryId: categoryId,
        accountId: accountId
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.description).toBe('Test Transaction');
    expect(response.body.amount).toBe('100');
  });

  test('should get all transactions', async () => {

    await request(app)
    .post('/api/transactions')
    .set('Authorization', `Bearer ${token}`)
    .send({
      description: 'Another Test Transaction',
      amount: 200,
      date: new Date(),
      type: 'EXPENSE',
      isRecurring: false,
      categoryId: categoryId,
      accountId: accountId
    });

    const response = await request(app)
      .get('/api/transactions')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('should get a single transaction', async () => {
    const createResponse = await request(app)
      .post('/api/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Single Transaction',
        amount: 200,
        date: new Date(),
        type: 'EXPENSE',
        isRecurring: false,
        categoryId: categoryId,
        accountId: accountId
      });

    const transactionId = createResponse.body.id;

    const response = await request(app)
      .get(`/api/transactions/${transactionId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.description).toBe('Single Transaction');
    expect(response.body.amount).toBe('200');
  });

  test('should update a transaction', async () => {
    const createResponse = await request(app)
      .post('/api/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Update Transaction',
        amount: 300,
        date: new Date(),
        type: 'INCOME',
        isRecurring: false,
        categoryId: categoryId,
        accountId: accountId
      });

    const transactionId = createResponse.body.id;

    const response = await request(app)
      .put(`/api/transactions/${transactionId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Updated Transaction',
        amount: 400
      });
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.description).toBe('Updated Transaction');
    expect(response.body.amount).toBe('400');
  });

  test('should delete a transaction', async () => {
    const createResponse = await request(app)
      .post('/api/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Delete Transaction',
        amount: 500,
        date: new Date(),
        type: 'EXPENSE',
        isRecurring: false,
        categoryId: categoryId,
        accountId: accountId
      });

    const transactionId = createResponse.body.id;

    const response = await request(app)
      .delete(`/api/transactions/${transactionId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(204);
  });

});
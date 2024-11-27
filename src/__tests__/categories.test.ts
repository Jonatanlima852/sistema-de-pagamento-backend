import request from 'supertest';
import app from '../app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Categories Controller', () => {
  let userId: number;
  let token: string;
  const testEmail = `categories@example.com`;

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
  });

  afterAll(async () => {
    await prisma.transaction.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.account.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.$disconnect();
  });

  test('should create a new category', async () => {
    const response = await request(app)
      .post('/api/categories')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Category',
        type: 'INCOME'
      });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Test Category');
    expect(response.body.type).toBe('INCOME');
  });

  test('should get all categories', async () => {
    
    await request(app)
      .post('/api/categories')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Another Test Category',
        type: 'EXPENSE'
      });

    const response = await request(app)
      .get('/api/categories')
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('should update a category', async () => {
   
    const createResponse = await request(app)
      .post('/api/categories')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Update Category',
        type: 'INCOME'
      });

    const categoryId = createResponse.body.id;

    const response = await request(app)
      .put(`/api/categories/${categoryId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Category',
        type: 'INCOME'
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Category');
    expect(response.body.type).toBe('INCOME');
  });

  test('should delete a category', async () => {
    
    const createResponse = await request(app)
      .post('/api/categories')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Delete Category',
        type: 'EXPENSE'
      });

    const categoryId = createResponse.body.id;
    console.log('Created Category ID for Delete:', categoryId);
   
    const response = await request(app)
      .delete(`/api/categories/${categoryId}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(204);
  });
});
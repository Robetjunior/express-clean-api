import request from 'supertest';
import app from '../src/server';

describe('User API', () => {
  it('should create a user successfully', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'John Doe', email: 'john@example.com' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', 'John Doe');
  });

  it('should fail when email is invalid', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'John Doe', email: 'not-an-email' });

    expect(res.statusCode).toEqual(400);
    expect(res.body.errors[0]).toHaveProperty('message', 'Invalid email format');
  });
});

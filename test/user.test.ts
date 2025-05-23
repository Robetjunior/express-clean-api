import request from 'supertest';
import app from '../src/server';

let token: string;
let userId: string;

describe('User API', () => {
  const userData = { name: 'John Doe', email: 'john@example.com', password: '123456' };

  it('should register a user successfully', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send(userData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('email', userData.email);
    userId = res.body.id;  // 🔸 salva ID para uso posterior
  });

  it('should fail to register with existing email', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send(userData);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'User already exists');
  });

  it('should fail to register with invalid email', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ ...userData, email: 'invalid-email' });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors[0]).toHaveProperty('message', 'Invalid email format');
  });

  it('should login successfully and receive JWT', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: userData.email, password: userData.password });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;  // 🔸 salva token para rotas protegidas
  });

  it('should fail login with incorrect password', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: userData.email, password: 'wrongpassword' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Invalid credentials');
  });

  it('should access protected route: get all users', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should fail to access protected route without token', async () => {
    const res = await request(app)
      .get('/api/users');

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message', 'Unauthorized');
  });

  it('should get user by ID', async () => {
    const res = await request(app)
      .get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('email', userData.email);
  });

  it('should update user successfully', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Jane Doe' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', 'Jane Doe');
  });

  it('should delete user successfully', async () => {
    const res = await request(app)
      .delete(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });

  it('should fail to get deleted user', async () => {
    const res = await request(app)
      .get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error', 'User not found');
  });
});

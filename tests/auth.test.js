const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/User');

describe('Authentication', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'password123' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should login a user', async () => {
    await User.create({ email: 'test@example.com', password: 'password123' });
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  describe('Password Reset', () => {
    it('should send a password reset email', async () => {
      await User.create({ email: 'test@example.com', password: 'password123' });
      const res = await request(app)
        .post('/api/auth/forgot-password')
        .send({ email: 'test@example.com' });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'An email has been sent with further instructions');
    });

    it('should reset password with valid token', async () => {
      const user = await User.create({ 
        email: 'test@example.com', 
        password: 'password123',
        resetPasswordToken: 'validtoken',
        resetPasswordExpires: Date.now() + 600*1000
      });

      const res = await request(app)
        .post('/api/auth/reset-password/validtoken')
        .send({ password: 'newpassword123' });
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message', 'Password has been reset successfully');

      const updatedUser = await User.findById(user._id);
      expect(updatedUser.resetPasswordToken).toBeUndefined();
      expect(updatedUser.resetPasswordExpires).toBeUndefined();
    });
  });
});
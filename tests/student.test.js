const request = require('supertest');
const app = require('../src/app');
const Student = require('../src/models/Student');
const User = require('../src/models/User');

describe('Student Management', () => {
  let token;

  beforeEach(async () => {
    await Student.deleteMany({});
    await User.deleteMany({});

    const user = await User.create({ email: 'test@example.com', password: 'password123' });
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });
    token = res.body.token;
  });

  it('should add a new student', async () => {
    const res = await request(app)
      .post('/api/students')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'John Doe', subject: 'Math', marks: 85 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('name', 'John Doe');
  });

  it('should get all students', async () => {
    await Student.create({ name: 'John Doe', subject: 'Math', marks: 85 });
    const res = await request(app)
      .get('/api/students')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });
});
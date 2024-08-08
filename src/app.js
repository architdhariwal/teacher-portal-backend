const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('./config/passport');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
// app.use(cors());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://teacher-portal-frontend.onrender.com', 
  methods: ["GET","PUT","PATCH","POST","DELETE"]
}));
app.use(passport.initialize());

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
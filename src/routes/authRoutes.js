const express = require('express');
const passport = require('passport');
const { login, register, forgotPassword, resetPassword } = require('../controllers/authController');
const { validateLogin, validateRegister, validateForgotPassword, validateResetPassword } = require('../middleware/validation');

const router = express.Router();

router.post('/login', validateLogin, passport.authenticate('local', { session: false }), login);
router.post('/register', validateRegister, register);
router.post('/forgot-password', validateForgotPassword, forgotPassword);
router.post('/reset-password/:token', validateResetPassword, resetPassword);

module.exports = router;

const express = require('express');
const { getStudents, addStudent, updateStudent, deleteStudent } = require('../controllers/studentController');
const { validateStudent } = require('../middleware/validation');
const { authenticateJWT } = require('../middleware/auth');

const router = express.Router();

router.use(authenticateJWT);

router.get('/', getStudents);
router.post('/', validateStudent, addStudent);
router.put('/:id', validateStudent, updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;
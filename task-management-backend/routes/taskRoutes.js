const express = require('express');
const taskController = require('../controllers/taskController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, taskController.createTask);
router.get('/', verifyToken, taskController.getTasks);
router.put('/:id', verifyToken, taskController.updateTask);
router.delete('/:id', verifyToken, taskController.deleteTask);

module.exports = router;

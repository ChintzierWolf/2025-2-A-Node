const express = require('express');
const taskController = require('../controllers/TaskController');

const router = express.Router();

router.get('/task', taskController.getTasks);
router.post('/task', taskController.createTasks);
router.put('/task/:id', taskController.updateTasks);
router.delete('/task/:id', taskController.deleteTask);

module.exports = router;
const express=require('express');
const router = express.Router();
const {createTaskValidator, deleteTaskValidator} = require('../validations/taskValidator')
const { createTask, updateTask,retrieveAll,retrieveByParams,deleteTask} = require('../controllers/taskController');

router.post('/create',createTaskValidator,createTask);
router.post('/update',createTaskValidator,updateTask);
router.get('/retrieve',retrieveByParams);
router.get('/retrieve_all',retrieveAll);
router.post('/delete',deleteTaskValidator,deleteTask);

module.exports = router;

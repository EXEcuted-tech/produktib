const express=require('express');
const router = express.Router();
const {createTaskValidator, searchLikeTaskValidator, deleteTaskValidator} = require('../validations/taskValidator')
const { createTask, updateTask,retrieveColumn,retrieveAll,retrieveByParamsLike,retrieveByParams,deleteTask} = require('../controllers/taskController');

router.post('/create', createTaskValidator,createTask);
router.get('/viewcol', retrieveColumn)
router.post('/update',createTaskValidator,updateTask);
router.get('/retrieve', retrieveByParams);
router.get('/retrievelike',searchLikeTaskValidator, retrieveByParamsLike);
router.get('/retrieve_all',retrieveAll);
router.post('/delete',deleteTaskValidator,deleteTask);

module.exports = router;

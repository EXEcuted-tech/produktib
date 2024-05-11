const express=require('express');
const router = express.Router();
const {createTaskValidator, searchLikeTaskValidator, deleteTaskValidator} = require('../validations/taskValidator')
const { createTask, updateTask,retrieveAll,retrieveByParamsLike,retrieveByParams,deleteTask} = require('../controllers/taskController');

router.post('/create', createTask);
router.post('/update',updateTask);
router.get('/retrieve', retrieveByParams);
router.get('/retrievelike',searchLikeTaskValidator, retrieveByParamsLike);
router.get('/retrieve_all',retrieveAll);
router.post('/delete',deleteTaskValidator,deleteTask);

module.exports = router;

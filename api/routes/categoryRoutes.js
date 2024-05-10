const express=require('express');
const router = express.Router();
const {createCatValidator, deleteCatValidator} =require('../validations/categValidator')
const { createCategory, updateCategory,retrieveAll,retrieveByParams,deleteCategory} = require('../controllers/catController');

router.post('/create',createCatValidator, createCategory);
router.post('/update',createCatValidator, updateCategory);
router.get('/retrieve',retrieveByParams);
router.get('/retrieve_all',retrieveAll);
router.post('/delete',deleteCatValidator, deleteCategory);

module.exports = router;

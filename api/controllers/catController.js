const express = require('express');
const db = require('./a_db'); 

const createCategory = (req, res) => {
  const { category_name, color } = req.body;
  
  const addNewCategory = 'INSERT INTO category (category_name, color) VALUES (?, ?)';
  
  const data = [category_name, color];
  
  db.query(addNewCategory, data, (err, results) => {
    if (err) {
      console.error("Error adding record:", err);
      return res.status(500).json({
        status: 500,
        success: false,
        error: 'Error adding new category'
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Category successfully added",
        category: results.insertId 
      });
    }
  });
}


const updateCategory = (req, res) => {
  const { category_name, color, category_id } = req.body;

  const updateCategoryQuery = 'UPDATE category SET category_name = ?, color = ? WHERE category_id = ?';
  const data = [category_name, color, category_id];

  db.query(updateCategoryQuery, data, (err, result) => {
    if (err) {
      console.error("Error updating record:", err);
      return res.status(500).json({
        status: 500,
        success: false,
        error: 'Error updating category'
      });
    } else {
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Category successfully updated",
      });
    }
  });
}


const deleteCategory = (req, res) => {
  const { category_id } = req.body;

  const deleteTasksQuery = `DELETE FROM task WHERE category_id = ?`;

  db.query(deleteTasksQuery, [category_id], (tasksErr, tasksResult) => {
    if (tasksErr) {
      console.error(`Error deleting tasks with category ID:${category_id}`, tasksErr);
      return res.status(500).json({ status: 500, success: false, error: 'Error Deleting Tasks' });
    }

    const deleteCategoryQuery = `DELETE FROM category WHERE category_id = ?`;

    db.query(deleteCategoryQuery, [category_id], (categoryErr, categoryResult) => {
      if (categoryErr) {
        console.error(`Error deleting category with ID:${category_id}`, categoryErr);
        return res.status(500).json({ status: 500, success: false, error: 'Error Deleting Category' });
      }

      return res.status(200).json({
        status: 200,
        success: true,
        message: 'Successfully Deleted Category and Associated Tasks'
      });
    });
  });
};

const retrieveAll = (req,res)=>{   
    const retrieveCategory = 'SELECT * FROM category'

    db.query(retrieveCategory,(err, rows) => {
      if (err) {
        console.error('Error retrieving all records:', err);
        return res.status(500).json({ status: 500, success:false,error: 'Error retrieving all records' });
      }else{
        return res.status(200).json({
          status: 200,
          success: true,
          category: rows,
        });
      }
    });
}

const retrieveByParams = (req,res)=>{
  const {col,val}=req.query;
  const retrieveCategory = 'SELECT * FROM category WHERE ??=?'

  db.query(retrieveCategory,[col,val],(err, row) => {
    if (err) {
      console.error('Error retrieving record:', err);
      return res.status(500).json({ status: 500, success:false,error: 'Error retrieving record' });
    }else{
      return res.status(200).json({
        status: 200,
        success: true,
        category: row,
      });
    }
  });
}


module.exports = {
    createCategory,
    updateCategory,
    retrieveAll,
    retrieveByParams,
    deleteCategory,
}
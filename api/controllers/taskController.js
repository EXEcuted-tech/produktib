const express = require('express');
const db = require('./a_db'); 

const createTask = (req, res) => {
  const { category_id, title, description} = req.body;

  const addTask = 'INSERT INTO task (category_id, title, description, task_status) VALUES (?, ?, ?, "Not Started")';
  const data = [category_id, title, description]
  db.query(addTask, data, (err, results) => {
    if (err) {
      console.error("Error adding record:", err)
      return res.status(500).json({
        status: 500,
        success: false,
        error: 'Error adding new task'
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Task successfully added",
        task_id: results.insertId 
      });
    }
  });
};

const updateTask = (req,res)=>{
  const {title, description, task_status, task_id} = req.body

  const updateTaskQuery = 'UPDATE task SET title = ?, description = ?, task_status = ? WHERE task_id = ?'

  const data = [title, description, task_status, task_id]

  db.query(updateTaskQuery, data, (error, results) => {
    if (error) {
      console.error("Error editing record:", error)
      return res.status(500).json({
        status: 500,
        success: false,
        error: 'Error adding new task'
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Task successfully updated",
        task_id: results.insertId 
      });
    }
  });
}

const deleteTask = (req,res)=>{

  const {task_id} = req.body;
  const query = `DELETE FROM task WHERE task_id = ?`

  db.query(query,[task_id],(err, rows)=>{
    if(err){
      console.error(`Error deleting record with ID:${task_id}`, err);
      return res.status(500).json({status: 500, success:false, error: 'Error Deleting Task'});
    }else{
      return res.status(200).json({
        status: 200,
        success: true,
        message: 'Successfully Deleted Task'
      })
    }
  })
}

const retrieveAll = (req,res)=>{   
    const {col,val,order} = req.query;
    
    const retrieveTasks = `SELECT * FROM task WHERE ??=? ORDER BY time_stamp ${order}`

    db.query(retrieveTasks,[col,val], (err, rows) => {
      if (err) {
        console.error('Error retrieving all records:', err);
        return res.status(500).json({ status: 500, success:false,error: 'Error retrieving all records' });
      }else{
        return res.status(200).json({
          status: 200,
          success: true,
          tasks: rows,
        });
      }
    });
}

const retrieveByParams = (req,res)=>{
  const {col1,val1,col2,val2,order} = req.query;
    
  const retrieveTasks = `SELECT * FROM task WHERE ??=? AND ??=? ORDER BY time_stamp ${order}`

  db.query(retrieveTasks,[col1,val1,col2,val2], (err, rows) => {

    if (err) {
      console.error('Error retrieving all records:', err);
      return res.status(500).json({ status: 500, success:false,error: 'Error retrieving all records' });
    }else{
      return res.status(200).json({
        status: 200,
        success: true,
        tasks: rows,
      });
    }
  });
}


module.exports = {
    createTask,
    updateTask,
    retrieveAll,
    retrieveByParams,
    deleteTask,
}
const express = require('express');
const db = require('./a_db'); 

const createTask = (req,res)=>{

}

const updateTask = (req,res)=>{

}

const deleteTask = (req,res)=>{
    
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

}


module.exports = {
    createTask,
    updateTask,
    retrieveAll,
    retrieveByParams,
    deleteTask,
}
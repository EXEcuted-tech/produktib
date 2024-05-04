const express = require('express');
const db = require('./a_db'); 

const createCategory = (req,res)=>{
  
}

const updateCategory = (req,res)=>{

}

const deleteCategory = (req,res)=>{
    
}

const retrieveAll = (req,res)=>{   
    const retrieveCategory = `SELECT * FROM category`

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
  const retrieveCategory = `SELECT * FROM category WHERE ??=?`

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
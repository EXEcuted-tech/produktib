function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

function containsSQLKeywords(obj) {
    for (let key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        if (containsSQLKeywords(obj[key])) {
          return true;
        }
      } else if (typeof obj[key] === 'string' && /INSERT|DELETE/i.test(obj[key])) {
        return true;
      }
    }
    return false;
  }

const createTaskValidator = (req,res,next)=>{
    let error = ""

    //console.log(req.body.title);

    if(!req.body.title || req.body.title == ''){
        error = "Task Title is required!"
    }

    if(!req.body.description || req.body.description == ''){
        error = "Task Description is required!"
    }

    if(req.body.title.length > 30){
        error = "Task Title too long!"
    }

    if(req.body.description.length > 1000){
        error = "Task Description is too long!"
    }

    console.log("Error: ",error);
    if (error !== '') {
        return res.json({
            status: 404,
            success: false,
            error: error,
        });
    }
    next();
}

const deleteTaskValidator = (req,res,next)=>{
    if (req.body){
        const {task_id} = req.body;
        if (isNumeric(task_id) == true){
            next();
        }else{
            console.error('Invalid Request');
            return res.status(400).json({status: 400, success: false, message: 'Invalid Input!'})
        }
    }else{
        console.error('Invalid Request, Cannot be Empty');
        return res.status(400).json({status: 400, success: false, message: 'Invalid Input! Cannot be NULL'})
    }
    
    
}

const searchLikeTaskValidator = (req, res, next) =>{
    if (req.query){
        const {col1,val1,col2,val2,order} = req.query;
        const queryParams = {col1,val1,col2,val2,order};
        if (containsSQLKeywords(queryParams)) {
            // Handle the case where SQL keywords are detected
            console.error('SQL keywords detected in the query parameters');
            return res.status(400).json({status: 400, success: false, message: 'Invalid Input! Malformed'})
          } else {
            if(val2 === null || val2 === undefined){
                return res.status(400).json({status: 400, success: false, message: 'Invalid Input! Cannot be NULL'})
            }
            else{
                next();
            }
          }
    }else{
        console.error('Invalid Request, Cannot be Empty');
        return res.status(400).json({status: 400, success: false, message: 'Invalid Input! Cannot be NULL'})
    }
}

module.exports = {
    createTaskValidator,
    deleteTaskValidator,
    searchLikeTaskValidator,
};

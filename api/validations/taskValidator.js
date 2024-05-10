function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

const createTaskValidator = (req,res,next)=>{
    let error = ""

    if(!req.body.title || req.body.title.length > 30){
        error = "Task title is invalid"
    }

    if(req.body.description.length > 200){
        error = "Task description is too long"
    }

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

module.exports = {
    createTaskValidator,
    deleteTaskValidator
};

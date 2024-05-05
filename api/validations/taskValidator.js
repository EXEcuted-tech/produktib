function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

const createTaskValidator = (req,res,next)=>{

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
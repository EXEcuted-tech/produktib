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

module.exports = [createTaskValidator];
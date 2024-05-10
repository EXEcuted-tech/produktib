const createCatValidator = (req,res,next)=>{
    let error = ""

    if(!req.body.category_name){
        error = "Category is required"
    }

    if(!req.body.color || req.body.color > 7){
        error = "Please input a valid hex color";
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

module.exports = [createCatValidator];
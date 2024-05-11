function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

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

const deleteCatValidator = (req,res,next)=>{
    if (req.body){
        const {category_id} = req.body;
        if (isNumeric(category_id) == true){
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
    createCatValidator,
    deleteCatValidator   
};

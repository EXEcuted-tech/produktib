const createCatValidator = (req,res,next)=>{

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
var insertModel= require('../models/users');

module.exports={
    userForm:function(req,res){
         res.render('register')
    },
    createData:function(req, res){
         var inputData= req.body;
         insertModel.createData(inputData, function(data){
            res.render('login')
            console.log("user record was created");
            console.log(data)
         });
    }
}
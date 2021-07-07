//models
var mongoose=require('mongoose');
var db = require('../index');

// create an schema
var userSchema = new mongoose.Schema({
  username: String,
  userlogin: String,
  password: String
});

userTable=mongoose.model('users',userSchema);
        
module.exports={
     createData:function(inputData, callback){
                  
        userData= new userTable(inputData);
        userData.save(function(err, data){
          if (err) throw err;
           return callback(data);
        });
     }
}

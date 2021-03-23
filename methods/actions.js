var User = require('../models/user')
var jwt = require('jwt-simple')
var config = require ('../config/dbconfig')
const user = require('../models/user')

var functions ={
    addNew: function (req,res) {
        if((!req.body.name)||(!req.body.password)){
            res.json({succes:false,msg:'Enter all fields'})
        }
        else{
            var newUser=User({
                name:req.body.name,
                password:req.body.password
            });
            newUser.save(function(err,newUser){
                if(err){
                    res.json({succes:false,msg:'Failed to save'})
                }
                else{
                    res.json({succes:true,msg:'Succesfuly saved'})
                }
            })
        }
    },
    authenticate:function(req,res){
        user.findOne({
            name:req.body.name
        },
        function(err,user){
            if(err) throw err
            if(!user){
                res.status(403).send({succes:false,msg:'Authentication Failed , User Not Found'})
            }
            else{
                user.comparePassword(req.body.password,function(err,isMatch){
                    if(isMatch&&!err){
                        var token = jwt.encode(user,config.secret)
                        res.json({succes:true,token:token})
                    }
                    else {
                        return res.status(403).send({succes:false,msg:'Authentication Failed,wrong password'})
                    }
                })
            }
        }
        )
    },
    getinfo:function(req,res){
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            var token = req.headers.authorization.split(' ')[1]
            var decodedtoken = jwt.decode(token, config.secret)
            return res.json({succes:true,msg:'hello' + decodedtoken.name})
        }
        else{
            return res.json({succes:false,msg:'No Headers'})
        }
    }
}
module.exports=functions
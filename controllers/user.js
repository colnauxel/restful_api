const mongoose=require('mongoose');
const User=require('../models/models').User;
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken'); 

const post_User=(req,res,next)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.status(500).json({
                error:err
            });
        }else{
            const new_user= new User({
                username:req.body.username,
                password:hash
            });
            new_user.save()
            .then(result=>{
                console.log(result);
                
                res.status(200).json({
                    message:"user created"
                })
            })
            .catch(err=>{
                res.status(500).json({
                    error:err
                })
            });
        }
    })
    
}
const login_User=(req,res,next)=>{
    User.find({username:req.body.username})
        .then(user=>{
            if(user.length<1){
                return res.status(404).json({
                    message:"username exist"
                })
            }
            bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
                if(err){
                    return res.status(401).json({
                        message:"Auth failed"
                    })
                }
                if(result){
                 const token=jwt.sign({
                        username:user[0].username,
                        userId:user[0]._id
                    },'secret',{
                        expiresIn:"1h"
                    });
                    return res.status(200).json({
                        message:"Auth successful",
                        token:token
                });
                 }
            })
        })
        .catch()

}
module.exports={
    post_User,login_User
}
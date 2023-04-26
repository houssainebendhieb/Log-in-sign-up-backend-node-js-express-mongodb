const express=require('express');
const route=express.Router();
const bcrypt=require('bcrypt')
const User=require('../model/user');
const jwt=require('jsonwebtoken');
route.use(express.urlencoded({extended: true}));
route.use(express.json());

route.post('',async(req,res)=>{

    try{
        let result=await User.findOne({email:req.body.email})
        if(!result)
        {
            return res.status(400).send('Invalid email or password');
        }
        const test=await bcrypt.compare(req.body.password,result.password);
        if(!test)
        {
            return res.status(400).send('Invalid email or password');
        }
        const k=jwt.sign({_id:result.id},'secretKey');
        res.status(200).send(k);
    }catch(err)
    {
        res.status(400).send(err.message);
    }



})
/*

route.post('register',async(req,res)=>{

    try{
        let user=new User(req.body);
        const result=await User.findOne({email:user.email})
        
        if(result)
        {
            return res.status(400).send('User already exist');
        }
        const salt=await bcrypt.genSalt(10);
        const hash=await bcrypt.hash(user.password,salt);
        user.password=hash;
         user=await user.save();
        res.status(200).send(user);

    }catch(err){
        res.status(400).send(err.message);
    }



})


*/



module.exports=route;
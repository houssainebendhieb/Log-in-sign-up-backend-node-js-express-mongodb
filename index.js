const express=require('express');
const app=express();

const User=require('./routes/user');
require('./connexion/connect');

app.use('/',User);






app.listen(3000,()=>{
    console.log('marhba fil mazraa');
})
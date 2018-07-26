const express=require('express');
const mongoose= require('mongoose');
const bodyParser=require('body-parser');

const app=express();

const Router_product=require('./routers/product_rt');
const Router_user=require('./routers/user_rt');
//BodyParser Middleware

app.use(bodyParser.json());

//DB config

const db=require('./config/keys').mongoURI;

mongoose.connect(db)
    .then(()=>{
        console.log("conected mongo database");
        
    })
    .catch(err=>console.log(err)
    )


//Router
app.use('/product',Router_product);
app.use('/',Router_user);
const port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`server created port${port}`);
    
});
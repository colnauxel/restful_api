const express=require('express');
const router=express.Router();

const User_Controller=require('../controllers/user');

router.post('/singup',User_Controller.post_User);
router.post('/login',User_Controller.login_User);


module.exports=router;
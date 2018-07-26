const express=require('express');
const checkAuth=require('../middleware/check-auth');
const Router=express.Router();
const Product_Controller=require('../controllers/product');

Router.get('/',Product_Controller.get_all_Product);
Router.get('/:id_pr',Product_Controller.get_Product);
Router.post('/',checkAuth,Product_Controller.post_Product);
Router.delete('/:id_pr',Product_Controller.delete_Product);
Router.patch('/:id_pr',Product_Controller.patch_Product);
module.exports=Router
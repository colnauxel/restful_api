const Product=require('../models/models').Product;

const get_all_Product=(req,res,next)=>{
    Product.find()
    .then(result=>{
        res.status(200).json({
            count:result.length,
            result:result
        })
    })
    .catch(err=>{
        res.status(404).json({
            error:err
        })
    })
}
const get_Product=(req,res,next)=>{
    const id=req.params.id_pr;

    Product.findById({_id:id})
        .then(result=>{
            res.status(200).json({
                result:result
            })
        })
}
const post_Product=(req,res,next)=>{
    const new_product=new Product({
        name:req.body.name
    });
   new_product.save()
        .then(result=>{
            res.status(200).json({
                message:"product saved",
                result:result
            })
        })
        .catch()
      
}
const delete_Product=(req,res,next)=>{
    const id=req.params.id_pr;
    Product.findById(id).remove()
    .then(result=>{
        res.status(200).json({
            message:"product deleted"
        })
    })
}
const patch_Product=(req,res,next)=>{
    const id=req.params.id_pr;
    const update_pr={
        name:req.body.name,
    
    }
    Product.update({_id:id},update_pr)
        .then(result=>{
            res.status(200).json({
                message:"product updated"

            })
        })
        .catch(err=>{
            res.status(500).json(err)
        })
}
module.exports={
    get_all_Product,get_Product,post_Product,delete_Product,patch_Product
}
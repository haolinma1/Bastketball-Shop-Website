const shoes=require('../models/schema')

// get all the nike shoe based on the page
const getAllproducts=async (req,res)=>{
   const {brand}=req.params
   const page = parseInt(req.query.page);
   // get the page number for this brand
   if (page===0) {
      const numOfShoe=(await shoes.find({brand:brand})).length
      const numOfPage=numOfShoe/10
      console.log(numOfPage);
      res.status(200).json(numOfPage)
   }
   else{
   const pagePerItem=10
   const skipItems=(page-1)*pagePerItem
   const shoesPerPage=await shoes.find({brand:brand})
   .select('brand name')
   .skip(skipItems)
   .limit(pagePerItem)
   res.status(200).json({shoesPerPage})
   }
}

// get the specific nike shoe by the name
const getProductsByName=async (req,res)=>{
    const {brand}=req.params
    const {name}=req.query
    const selectShoe=await shoes.find({brand:brand,name:name}).select('brand name size')
    res.status(200).json({selectShoe})
 }







module.exports={getAllproducts,getProductsByName}
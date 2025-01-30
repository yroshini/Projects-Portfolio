const express=require("express");
const router=express.Router();

const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");

const Listing=require("../models/listing.js");

const {listingSchema}=require("../schema.js");

//-------creating a middle ware to validate schema----
const validateListing=(req,res,next)=>{
    let{error}=listingSchema.validate(req.body);
    if(error){
        let ermsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(404,error);
    }
    else{
        next();
    }
}

//--------index route--------
router.get("/",wrapAsync(async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}));

//---------new route-----
router.get("/new",(req,res)=>{
    res.render("listings/new.ejs");
});

//-------show route-----
router.get("/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs",{listing});
}));

// ---------create route-------
router.post("/",validateListing,wrapAsync(async (req,res)=>{
    //let {title,description,image,price,location,country}=req.params;
    // let listing=req.body.listing; ----instead of above we can write this
    // new Listing(listing); 
    if(!req.body.listing){
        throw new ExpressError(404,"Send valid data for Listing!");
    }
    //const newListing=new Listing(req.body.listing);//------instead of above two  we can write this
    // if(!newListing.title){
    //     throw new ExpressError(404,"Title missing !!");
    // }

    // if(!newListing.description){
    //     throw new ExpressError(404,"Description missing !!");
    // }

    // if(!newListing.price){
    //     throw new ExpressError(404,"Price missing !!");
    // }

    // if(!newListing.location){
    //     throw new ExpressError(404,"location missing !!");
    // }
    //-------- instead of writing like this for all we use "Joi.dev";
    
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));

//-------edit route---------
router.get("/:id/edit",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
}));

//------update route-------
router.put("/:id",validateListing,wrapAsync(async(req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(404,"Send valid data for Listing!");
    }
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    //  res.redirect("/listings");
    res.redirect(`/listings/${id}`);
}));
//--------delete------------
router.delete("/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));


module.exports=router;
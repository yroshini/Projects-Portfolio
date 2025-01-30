const express =require("express");
const router=express.Router();



//---------index -> users
router.get("/",(req,res)=>{
    res.send("I'm User Indez");
})

//--------show ->uusers
router.get("/:id",(req,res)=>{
    res.send("SHow Users")
})
//------post ->users
router.post("/",(req,res)=>{
    res.send("POST for Users")
})
//-------delete ->users
router.delete("/:id",(req,res)=>{
    res.send("Delete Users")
})


module.exports=router;
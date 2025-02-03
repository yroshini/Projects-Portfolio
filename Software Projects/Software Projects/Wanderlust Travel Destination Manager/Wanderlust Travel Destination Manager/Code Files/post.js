const express =require("express");
const router=express.Router();


//---------index ->posts
router.get("/",(req,res)=>{
    res.send("I'm posts Indez");
})

//--------show ->posts
router.get("/:id",(req,res)=>{
    res.send("SHow posts")
})
//------post ->posts
router.post("/",(req,res)=>{
    res.send("POST for posts")
})
//-------delete ->posts
router.delete("/:id",(req,res)=>{
    res.send("Delete posts")
})



module.exports=router;
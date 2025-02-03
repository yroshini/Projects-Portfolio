const express=require("express");
const app=express();
const path=require('path');
const mongoose=require("mongoose");
const methodoverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");

const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js");

//-------to connect database------
mongo_url="mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(res=>{
        console.log("Connected to DB");
    })
    .catch(err=>{
        console.log(err);
    });
async function main() {
    await mongoose.connect(mongo_url);
};

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));
app.use(methodoverride("_method"));
app.engine("ejs",ejsMate);

app.use(express.static(path.join(__dirname,"/public")));
//-------basic api------
app.get("/",(req,res)=>{
    res.send("I'm working Workking finee");
});

//---------testing whether our code is working or not--
app.get("/testListing",async (req,res)=>{
    let samplelisting=new Listing({
        title:"My New Villa",
        description:"By the Beach",
        price:160000,
        location:"Paris",
        country:"London",
    });
    await samplelisting.save();
    console.log("Sample saved !");
    res.send("Successfull !");
});

app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found !!"));
})

app.use((err,req,res,next)=>{
    console.log(err.stack);
    let{status=500,message="Something went Wrong!!"}=err;
    res.status(status).render("listings/error.ejs",{message});
    //res.status(status).send(message);
});

app.listen(8080,()=>{
    console.log("Listening to port 8080");
});
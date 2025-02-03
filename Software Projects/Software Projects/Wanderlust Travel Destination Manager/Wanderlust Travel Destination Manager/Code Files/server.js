const express=require("express");
const app=express();

const users=require("./routes/user.js");
const posts=require("./routes/post.js");
const session=require("express-session");
const flash=require("connect-flash");

const path=require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


//---------------express - sessions-----------
const sessionoptions={
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
};

app.use(session(sessionoptions));
app.use(flash());


app.get("/register",(req,res)=>{
    let{name="Unknown :)"}=req.query;
    req.session.name=name;
    
    if(name==="Unknown :)"){
        req.flash("error","User NOT registered :( ");
    }
    else{
        req.flash("success","User registered successfully! ");
    }
    
    res.redirect("/hello");
});
// accessing above register below
app.get("/hello",(req,res)=>{
   // res.render("page.ejs",{name:req.session.name,msg:req.flash("success")});
   res.locals.messages=req.flash("success");
   res.render("page.ejs",{name:req.session.name});
})

app.get("/reqcount",(req,res)=>{
    if(req.session.count){
        req.session.count++;
    }
    else{
        req.session.count=1;
    }

    res.send(`You sent a request ${req.session.count} times`);
})

// //---------------cookies------------
// const cookieParser=require("cookie-parser");
// app.use(cookieParser("secretcode"));

// //---------creating signed cookies-----

// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("made-in","India",{signed:true});
//     res.send("signed cookie sent!!");
// })

// app.get("/verify",(req,res)=>{
//     console.log(req.cookies); // accessing unsigned cookies
//     console.log(req.signedCookies)// accessing signed cookies
    
//     res.send("Verified !!");
// })

// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","hi Heelo !");
//     res.send("You got some cookies");
// })

// app.get("/greet",(req,res)=>{
//     let {name="Unknown :)"}=req.cookies;
//     res.send(`Hi, ${name}`);
// })

// app.get("/",(req,res)=>{
//     res.send("Hi, I'm the ROOT !");
// })

// app.use("/users",users); 
// app.use("/posts",posts);

app.listen(3000,()=>{
    console.log("server is listening to 3000");
})
const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing=require("../models/listing.js");


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
}

const initDB=async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("Data was initialized");
}

initDB();
import mongoose from "mongoose";

const connectDb = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL,{
            dbName:"snaptrail",
        })
        console.log("Connected to MongoDB");
    }
    catch(error){
        console.log(error);
    }
}

export default connectDb;
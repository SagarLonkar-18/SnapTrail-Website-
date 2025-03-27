import mongoose, { mongo } from "mongoose";

const schema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    trail:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    image:{
        id: String,
        url: String,
    },
    comments:{
        user: {
            type:String,
        },
        name:{
            type:String,
        },
        comment:{
            type:String,
        },
    },

},{
    timestamps: true,
});

export const Trail = mongoose.model("Trail",schema);
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import TryCatch from "../utils/TryCatch.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = TryCatch(async (req,res) => {
    const {name, email, password} = req.body;
    // check if all fields are there
    if(!name ||!email ||!password){
        return res.status(400).json({error: "All fields are required"});
    }
    // Check if the user already exists
    let user = await User.findOne({email});
    if(user){
        return res.status(400).json({message: "User already exists"});
    }
    // Create a new user
    const hashPassword = await bcrypt.hash(password,10);
    user = await User.create({
        name,
        email,
        password: hashPassword
    })
    // user.save();

    // generate token
    generateToken(user._id,res);

    // Send the user object back to the client
    res.status(201).json({user,message: "User registered successfully"});
})

export const loginUser = TryCatch(async(req,res)=>{
    const {email, password} = req.body;
    // check if all fields are there
    if(!email ||!password){
        return res.status(400).json({error: "All fields are required"});
    }
    // Check if the user exists
    const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({message: "No user with this mail"});
    }
    // Check if the password is correct
    const comparePassword = await bcrypt.compare(password, user.password);
    if(!comparePassword){
        return res.status(401).json({message: "Invalid password"});
    }
    // generate token
    generateToken(user._id,res);
    res.json({
        user,
        message: "User logged in"
    });
})

export const myProfile = TryCatch(async(req,res)=>{
    const user = await User.findById(req.user._id);
    res.json(user);
}) 

export const userProfile = TryCatch(async(req,res)=>{
    // but while fetching the user we are also getting the password, to avoid it we do .select("-password")
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
});

export const followAndUnfollowUser = TryCatch(async(req,res)=>{
    const user = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);
    if(!user){
        return res.status(400).json({
            message: "No user with this id"
        });
    }
    // we need to convert id to string because it will be in form of object id
    // checking if we are trying to follow ourself
    if(user._id.toString() === loggedInUser._id.toString()){
        return res.status(400).json({
            message: "You can't follow yourself"
        });
    }
    // unfollowing user
    if(user.followers.includes(loggedInUser._id)){
        // if user is already followed then we unfollow him
        const indexFollowing = loggedInUser.following.indexOf(user._id);
        const indexFollowers = user.followers.indexOf(loggedInUser._id); 
        loggedInUser.following.splice(indexFollowing, 1);
        user.followers.splice(indexFollowers, 1);
        await loggedInUser.save();
        await user.save();
        return res.status(200).json({
            message: "User unfollowed successfully"
        });
    }
    // following user
    else{
        loggedInUser.following.push(user._id);
        user.followers.push(loggedInUser._id);
        await loggedInUser.save();
        await user.save();
        return res.status(200).json({
            message: "User followed successfully"
        });
    }
});

export const logOutUser = TryCatch(async(req,res)=>{
    res.cookie("token","",{maxAge:0});
    res.json({
        message: "User logged out successfully"
    });
});
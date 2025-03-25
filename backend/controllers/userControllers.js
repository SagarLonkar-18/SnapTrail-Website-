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
        message: "User logged in successfully"
    });
})

export const myProfile = TryCatch(async(req,res)=>{
    const user = await User.findById(req.user._id);
    res.json(user);
})
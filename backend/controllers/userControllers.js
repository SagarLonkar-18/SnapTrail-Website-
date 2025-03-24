import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";

export const registerUser = async(req,res) => {
    try{
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
        // Send the user object back to the client
        res.status(201).json({user,message: "User registered successfully"});
        
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getDataUri } from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const {fullName, email, phoneNumber, role, password} = req.body;

        if(!fullName || !email || !phoneNumber || !role || !password)   return res.status(400).json({message : "something is missing", success : false});

        const user = await User.findOne({email});
        if(user)    return res.status(400).json({message : "email already exist", success : false});

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({fullName, email, phoneNumber, role, password : hashedPassword});

        return res.status(201).json({message : "account created successfully", success : true});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message : "some error occured while registering", success : false});
    }
}

export const login = async (req, res) => {
    try {
        const {email, password, role} = req.body;

        if(!email || !role || !password)   return res.status(400).json({message : "something is missing", success : false});

        let user = await User.findOne({email});
        if(!user)   return res.status(400).json({message : 'incorrect user or password', success : false});

        const machedPassword = await bcrypt.compare(password, user.password);
        if(!machedPassword)   return res.status(400).json({message : 'incorrect user or password', success : false});

        if(role !== user.role)  return res.status(400).json({message : `account doesn't exist with current role`, success : false});

        const tokenData = {userId : user._id};
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn : '1d'});

        return res.status(200).cookie("token", token, {maxAge : 1*24*60*60*1000, httsOnly : true, sameSite : 'strict'}).json({message : `welcome back ${user.fullName}`, user, success : true});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message : "some error occured while login", success : false})
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge : 0}).json({message : "logout successully", success : true});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message : "some error occured while logout", success : false});
    }
}

export const updateProfile = async (req, res) => {
    try {
        const {fullName, email, bio, skills, phoneNumber} = req.body;
        const file = req.file;

        // cloudinay comes heare...
        let cloudResponse;
        if(file){
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content, {resource_type: "auto",type: "upload"});
        }
        
        let skillsArray;
        if(skills)  skillsArray = skills.split(',');

        const userId = req.id;
        let user = await User.findByIdAndUpdate(userId, {fullName, email, phoneNumber, profile : {bio, skills : skillsArray}});

        // resume comes here...
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeName = file.originalname;
        }

        await user.save();

        return res.status(200).json({message : 'profile updated successfully', user, success : true});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message : "some error occured while updating profile", success : false});
    }
}
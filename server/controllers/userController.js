import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import { validateHeaderValue } from "http";
import jwt from 'jsonwebtoken';

const COOKIE_OPTIONS={
     httpOnly:true,
     sameSite:'lax',
    //  secure:process.env.NODE_ENV==='production',
     secure:false,
     maxAge:24*60*60*1000 //1 day
};

export const register=async(req,res)=>{
    try{
         const {name,email,password}=req.body;
         if(!name||!email||!password) return res.status(400).json({message:"Missing fleids"});

         const exists=await User.findOne({email});
         if(exists) return res.status(400).json({message:"Email already in use"});

         const hashed=await bcrypt.hash(password,10);
         const user=await User.create({name,email,password:hashed});

         const token =jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn: '1d'});
         res.cookie('token',token,COOKIE_OPTIONS);
         res.json({user:{id:user._id,name:user.name,email:user.email},message:"user registered"})

    }catch (error){
        res.status(500).json({message:'Server error'});
    }
};

export const login=async (req,res)=>{
    try {
         const {email,password}=req.body;
         const user=await User.findOne({email});
         if (!user) return res.status(400).json({message:"Invalid credentials"})
         
        const valid=await bcrypt.compare(password,user.password);
        if(!valid) return res.status(400).json({message:"Invalid credentials"});
        
        const token =jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        res.cookie('token',token ,COOKIE_OPTIONS);
        res.json({
            user: {
            id:user._id,
            name:user.name,
            email:user.email,
            },
        message:"Logged in Successfully"
        })

    }catch (error){
        res.status(500).json({message:'Server error'});
    }
};

export const logout =(req,res)=>{
     res.clearCookie('token',COOKIE_OPTIONS);
     res.json({message:'Logged out'});
}

export const me=async (req,res)=>{
     const {id}=req.user;
     const user=await User.findById(id).select('-password');
     console.log(user);
     res.json({user});
};
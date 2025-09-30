import Note from "../models/noteModel.js";

export const createNote=async(req,res)=>{ 
    try{
         const note=await Note.create({...req.body,user:req.user.id});
         res.json({"success":true,note});
    }catch (error){
         res.status(400).json({message:error.message});
    }
};

export const getNotes=async(req,res)=>{
         const notes=await Note.find({user:req.user.id});
         res.json(notes); 
}

export const updateNote=async(req,res)=>{
     //Find the note by ID
    const note=await Note.findById(req.params.id);
    //if no note found ,return 404
    if(!note) return res.status(404).json({message:"not found"});
    // update the note and return the new version 
    const updated=await Note.findByIdAndUpdate(req.params.id, req.body,{new:true});
    res.json({"success":true,updated});
}

export const deleteNote=async(req,res)=>{
     const note =await Note.findById(req.params.id);
     if(!note) return res.status(404).json({message:'not found '});
     await note.deleteOne();
     res.json({"success":true,"message":"Note deleted"});
};


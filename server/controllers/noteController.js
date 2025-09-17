import Note from "../models/noteModel.js";

export const createNote=async(req,res)=>{ 
    try{
         const note=await Note.create(req.body);
         res.json(note);
    }catch (error){
         res.status(400).json({message:error.message});
    }
};

export const getNotes=async(req,res)=>{
         const notes=await Note.find();
         res.json(notes); 
}

export const updateNote=async(req,res)=>{
    const updated=await Note.findByIdAndUpdate(req.params.id, req.body,{new:true});
    res.json(updated);
}

export const deleteNote=async(req,res)=>{
     await Note.findByIdAndDelete(req.params.id);
     res.json({message:"Note deleted"});
};

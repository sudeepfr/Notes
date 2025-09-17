import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
     title:{type:String,required:true},
     description:{type:String},
},{timestamps:true});

const Note=mongoose.model("Node",noteSchema);

export default Note;
import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    diagonsedWith:{
        required:true,
        type:String
    },
    address:{
        required:true,
        type:String
    },
    age:{
        required:true,
        type:Number
    },
    bloodGroup:{
        required:true,
        type:String
    },
    gender:{
        type:String,
        enum:["M","F"],
        required:true
    },
    admittedIn:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hospital"
    }
},{timestamps:true})


export const Patient = mongoose.model("Patient",patientSchema)

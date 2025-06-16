import mongoose from "mongoose";

const timeSchema = new mongoose.Schema({
    hospital:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hospital"
    },
    time:{
        type:Number,
        required:true
    }
})

const doctorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        required:true,
        default:0
    },
    workInHospitals:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Hospital"
        }
    ],
    timetaken:[timeSchema]
},{timestamps:true})


export const Doctor = mongoose.model("Doctor",doctorSchema)

import { asyncHandler } from "../utils/async_handler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

const registerUser = asyncHandler( async (req,res) => {
    // res.status(200).json({
    //     message:"Ok"
    // })
    const {fullName, userName, email, password} = req.body
    console.log("email",email)
    // if(fullName === ""){
    //     throw new ApiError(400,"FullName required")      //Can do this way also 
    // }
    //Here is one new method to do the same 

    if(
        [fullName,userName,email,password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400,"All fields are required")
    }
    //Now we need to check if the user already exists or not 
    //Db me check krna hoga 
    const userExisted = User.findOne({
        $or:[{ userName },{ email }]
    })
    if(userExisted){
        throw new ApiError(409,"User already exists")
    }
    
})

//Steps to register user
//get user details from frontend
//validation - not empty
//check if user already exists:username,email
//check for images,check for avatar
//upload them to cloudinary,avatar
//create user object -create entry in db
//remove password and refresh token field from responses
//check for user creation
//return res

export {registerUser}
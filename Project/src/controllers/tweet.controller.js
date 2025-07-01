import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/async_Handler.js"

const createTweet = asyncHandler(async (req, res) => {
    //TODO: create tweet
    //Get the tweet from the form
    //Check the necessary validations 
    //Put the tweet in the database 
    // const {content} = req.body
    // // console.log(req.body)
    // // console.log("tweet ",content)
    // if(content.trim() === "")throw new ApiError(400,"Fill the required fields");
    
    
    // const owner = await User.findById(req.user._id)
    // if(!owner)throw new ApiError(401,"Invalid User");
    // // console.log("owner ",owner)
    // const create = await Tweet.create({
    //     content,
    //     owner
    // }) 

    // return res.status(200)
    // .json(new ApiResponse(200,create,"Tweet created successfully"))

})

const getUserTweets = asyncHandler(async (req, res) => {
    // TODO: get user tweets
    //Get the userId from the url
    //Retrieve the user tweets by making call in the database 
    // const {userId} = req.params
    // if(!userId)throw new ApiError(400,"Invalid User id");

    // const user = await User.findById(req.user._id)

    // const content = await Tweet.aggregate([
    //     {
    //         $lookup:{
    //             from:"User",
    //             localField:"owner",
    //             foreignField:"_id",
    //             as:"owner"
    //         }
    //     },
        
    //     {
    //         $project:{
    //             userName:1,
    //             avatar:1,
    //             coverImage:1,
    //             content:1,
    //             createdAt:1,
    //             updatedAt:1,
                
    //         }
    //     }
    // ])
    // if(content.length === 0)throw new ApiError(401,"No tweet made by user");
    // console.log("content ",content)
    // return res.status(200)
    // .json(new ApiResponse(200,content[0],"Tweets fetched successfully"))

})

const updateTweet = asyncHandler(async (req, res) => {
    //TODO: update tweet
})

const deleteTweet = asyncHandler(async (req, res) => {
    //TODO: delete tweet
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}
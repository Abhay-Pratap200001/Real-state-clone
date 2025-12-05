import cloudinary from "../config/Cloudinary.js";
import Listing from "../models/listing.model.js"
import { ApiError } from "../utils/ApiError.js";


export const createListing = async (req, res) => {
  try {    
    const newListing = new Listing(req.body);
    await newListing.save();
    console.log(newListing);
    res.status(201).json(newListing);
    console.log(newListing);
  } catch (error) {
    return next(new ApiError(500, "Internal server error Failed to create listing"));
  }
};


export const uploadImage = async (req, res) => {  
  try {
    const image = req.files.image;
    const result = await cloudinary.uploader.upload(image.tempFilePath);
    res.status(200).json({url: result.secure_url});
    // console.log( result.secure_url);
  } catch (error) {
    return next(new ApiError(500, "Internal server error Failed to upload image"));
  }
};

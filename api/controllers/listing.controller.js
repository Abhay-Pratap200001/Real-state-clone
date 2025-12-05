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


export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(new ApiError(404, 'Listing not found!'));
  }

  if (req.user.id !== listing.userRef) {
    return next(new ApiError(401, 'You can only delete your own listings!'));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    return next(new ApiError(500, "Internal server error Failed to delete listing"))
  }
};


// for updating the listing
export const updateListing = async(req, res, next) => {
  const listing = await Listing.findById(req.params.id)
  if (!listing) {
    return next(new ApiError(401, "Listing not found!"))
  }

  if (req.user.id !== listing.userRef) {
    return next(new ApiError(401, "You can only update your own listings!"))
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedListing)
  } catch (error) {
    return next(new ApiError(500, "Internal server error Failed to update Listing!"))
  }
}



// for getting single specific listing
export const getListing = async(req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id)
    if (!listing) {
      return next(new ApiError(401, "Listing not found!"))
    }
    res.status(200).json(listing)
  } catch (error) {
    return next(new ApiError(500, "Internal server error Failed to show Listing!")) 
  }
}
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
    console.log( result.secure_url);
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





// GET MULTIPLE LISTINGS WITH FILTERS
export const getListings = async (req, res, next) => {
  try {
    // Pagination values
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    // OFFER FILTER
    let offer = req.query.offer;
    if (offer === "undefined" || offer === "false") {
      offer = { $in: [false, true] }; // show all
    }

    // FURNISHED FILTER
    let furnished = req.query.furnished;
    if (furnished === "undefined" || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    // PARKING FILTER
    let parking = req.query.parking;
    if (parking === "undefined" || parking === "false") {
      parking = { $in: [false, true] };
    }

    // TYPE FILTER (rent/sale)
    let type = req.query.type;
    if (type === "undefined" || type === "false") {
      type = { $in: [false, true] };
    }

    // SEARCH, SORT, ORDER
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    // Fetch filtered listings
    const listing = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order }) // sort by date or price
      .limit(limit) // pagination size
      .skip(startIndex); // pagination starting point

    // Fixed variable name
    return res.status(200).json(listing);
  } catch (error) {
    return next(new ApiError(500, "Internal server error"));
  }
};
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const test = (req, res) => {
  res.json({ message: "Hello" });
};


/* -------------------------------- updateUser -------------------------------- */
export const updateUser = async (req, res, next) => {
  // AUTH CHECK – User can update ONLY their own account
 
  if (!req.user) {
    return next(new ApiError(401, "Unauthorized - No token"));
  }

  // Prevent updating someone else's account
  if (req.user.id !== req.params.id) {
    return next(new ApiError(401, "You can only update your own account!"));
  }

  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    // UPDATE USER FIELDS IN DATABASE
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password, // hashed if provided
        },
      },
      { new: true } // return updated user instead of old one
    );

    // REMOVE PASSWORD FROM RESPONSE
    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
      return next(new ApiError(401, "Internal server error failed to update user"));
  }
};



/* -------------------------------- deleteUser -------------------------------- */
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(new ApiError (401, 'You can only delete your own account!'));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('User has been deleted!');
  } catch (error) {
      return next(new ApiError(401, "Internal server error failed to delete account!"));
  }
};
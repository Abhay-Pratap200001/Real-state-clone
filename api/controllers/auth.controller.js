import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import {ApiError} from "../utils/ApiError.js"
import jwt from "jsonwebtoken"

/* -------------------------------- SIGNUP -------------------------------- */
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    //All fields validation
    if (!username || !email || !password) {
      return next(new ApiError(400, "All fields are required"));
    }

   
    // User already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new ApiError(400, "User with this email already exists"));
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      message:"User Created successfully"
    });

  } catch (error) {
    console.log("Signup controller error:", error.message);
    return next(new ApiError(500, "Internal Server Error"));
  }
};




/* -------------------------------- LOGIN -------------------------------- */
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // All fields present
    if (!email || !password) {
      return next(new ApiError(400, "All fields are required"));
    }

    // User exists check
      const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(new ApiError(400, "Invalid credentials"));
    }

    // Password check
      const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return next(new ApiError(401, "Incorrect password"));
    }

    // Token
    const token = jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    //seprating the password from response which we send to client
    const { password: pass, ...userData } = validUser._doc;

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
      .status(200)
      .json(userData);

  } catch (error) {
    console.log("Login controller error:", error.message);
    return next(new ApiError(500, "Internal Server Error"));
  }
};



/* ------------------------------- GOOGLE SIGN IN ------------------------------ */
export const google = async (req, res, next) => {
  try {
    const { email, name, photo } = req.body;

    //  Basic validation - make sure required fields exist
    if (!email || !name) {
      return next(new ApiError(400, "Google account data missing"));
    }

    // Check if user already exists in DB
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // User exists → create token and log in
      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);

      const { password, ...userData } = existingUser._doc;

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        })
        .status(200)
        .json(userData);
    }

    // --------------------------------------------------------------
    //  If user does NOT exist → create a new user
    // --------------------------------------------------------------

    // Generate random strong password (for record only, user won’t use it)
    const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

    // Hash password (YOU MISSED "await" earlier)
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    // Create unique username based on Google name
    const username =
      name.split(" ").join("").toLowerCase() +
      Math.random().toString(36).slice(-4);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      avatar: photo,
    });

    await newUser.save();

    
    // Create JWT token for the new user
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    const { password, ...userData } = newUser._doc;

    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .json(userData);

  } catch (error) {
    console.log("Google Auth Error:", error.message);
    return next(new ApiError(500, "Google Authentication Failed"));
  }
};


/* ------------------------------- signOut ------------------------------ */
export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    return next(new ApiError(401, "Internal server error failed to signOut"));
  }
};
import express from 'express';
import { createListing, uploadImage, deleteListing, updateListing, getListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/create", verifyToken, createListing)
router.post("/upload-image", verifyToken, uploadImage)
router.delete("/delete/:id", verifyToken, deleteListing)
router.put("/update/:id", verifyToken, updateListing) //for update a specific listing
router.get("/get/:id", getListing) //for getting a specific listing

export default router;
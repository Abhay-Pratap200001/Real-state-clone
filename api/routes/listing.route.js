import express from 'express';
import { createListing, uploadImage } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/create", verifyToken, createListing)
router.post("/upload-image", verifyToken, uploadImage)

export default router;
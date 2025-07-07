import express from "express";
import { addCard, getCards } from "../controller/cardController.js";
import { addBanner, getBanner } from "../controller/bannerController.js";
import adminAuth from "../middleware/adminAuth.js";
import upload from "../middleware/multer.js";

const cardRouter = express.Router();

// Admin-only route to add a card with a single image
cardRouter.post("/add", adminAuth, upload.single("image"), addCard);
cardRouter.post("/banner", adminAuth, upload.single("image"), addBanner);
cardRouter.get("/getCards", getCards);
cardRouter.get("/getBanner", getBanner);
export default cardRouter;

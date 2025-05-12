import express from "express";
import {
  addProduct,
  getAllProducts,
  removeProduct,
  singleProduct,
} from "../controller/productController.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

const uploadFields = upload.fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  { name: "image4", maxCount: 1 },
  { name: "image5", maxCount: 1 },
]);

productRouter.post("/addProduct", uploadFields, addProduct);
productRouter.get("/getAllProducts", getAllProducts);
productRouter.delete("/removeProduct/:id", removeProduct);
productRouter.get("/singleProduct/:id", singleProduct);
export default productRouter;

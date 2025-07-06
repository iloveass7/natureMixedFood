import express from "express";
import {
  addProduct,
  getAllProducts,
  removeProduct,
  singleProduct,
  updateProduct,
} from "../controller/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

const uploadFields = upload.fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  { name: "image4", maxCount: 1 },
  { name: "image5", maxCount: 1 },
]);

productRouter.post("/addProduct", adminAuth, uploadFields, addProduct);
productRouter.get("/getAllProducts", getAllProducts);
productRouter.put("/updateProduct/:id", adminAuth, uploadFields, updateProduct);
productRouter.delete("/removeProduct/:id", adminAuth, removeProduct);
productRouter.get("/singleProduct/:id", singleProduct);
export default productRouter;

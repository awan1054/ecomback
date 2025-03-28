import express, { Router } from "express";
import authMiddleware, { Role } from "../middleware/authMiddleware";

import { multer, storage } from "../middleware/multerMiddleware";
import productController from "../controllers/product.controller";
const upload = multer({ storage: storage });
const router: Router = express.Router();

router
  .route("/")
  .post(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Admin),
    upload.single("image"),
    productController.addProduct
  )
  .get(productController.getAllProducts);

router
  .route("/:id")
  .get(productController.getSingleProduct)
  .delete(
    authMiddleware.isAuthenticated,
    authMiddleware.restrictTo(Role.Admin),
    productController.deleteProduct
  );

export default router;

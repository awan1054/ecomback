import { Request, Response } from "express";
import Product from "../database/models/Product";

class ProductController {
  async addProduct(req: Request, res: Response): Promise<void> {
    const {
      productname,
      productdescription,
      productTotalStockQty,
      productPrice,
    } = req.body;
    let fileName;
    if (req.file) {
      fileName = req.file?.filename;
    } else {
      fileName =
        "https://plus.unsplash.com/premium_photo-1678099940967-73fe30680949?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D";
    }

    if (
      !productname ||
      !productPrice ||
      !productTotalStockQty ||
      !productdescription
    ) {
      res.status(400).json({
        message: "Please provide product name ,productdescription.......",
      });
      return;
    }
    await Product.create({
      productname,
      productImageUrl: fileName,
      productPrice,
      productdescription,
      productTotalStockQty,
    });
    res.status(200).json({
      message: "Product added successfully",
    });
  }
}

export default new ProductController();

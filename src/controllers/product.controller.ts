import { Request, Response } from "express";
import Product from "../database/models/Product";
import { AuthRequest } from "../middleware/authMiddleware";
import User from "../database/models/userModel";
import Category from "../database/models/category";

class ProductController {
  async addProduct(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    const {
      productname,
      productdescription,
      productTotalStockQty,
      productPrice,
      CategoryId,
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
      userId: userId,
      CategoryId: CategoryId,
    });
    res.status(200).json({
      message: "Product added successfully",
    });
  }

  async getAllProducts(req: Request, res: Response): Promise<void> {
    const data = await Product.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "email", "username"],
        },
        {
          model: Category,
          attributes: ["categoryName"],
        },
      ],
    });
    res.status(200).json({
      message: "Products fetched successfully",
      data,
    });
  }
}

export default new ProductController();

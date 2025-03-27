import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Cart from "../database/models/Cart";
import Product from "../database/models/Product";

class CartController {
  async addToCart(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    const { quantity, ProductId } = req.body;
    if (!quantity || !ProductId) {
      res.status(404).json({
        message: "Plerase provide quantity ProductId",
      });
    }

    //check if the product already exists in the cart table or not
    let cartItem = await Cart.findOne({
      where: {
        ProductId,
        userId,
      },
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({
        quantity,
        userId,
        ProductId,
      });
    }
    res.status(200).json({
      message: "Product added to the cart",
      data: cartItem,
    });
  }

  async getMyCarts(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;

    const cartItems = await Cart.findAll({
      where: {
        userId,
      },
      include: {
        model: Product,
      },
    });
    if (cartItems.length == 0) {
      res.status(404).json({
        message: "NO item in the cart",
      });
    } else {
      res.status(202).json({
        message: "Cart items fetched successfully",
        data: cartItems,
      });
    }
  }
}

export default new CartController();

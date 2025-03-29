import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Cart from "../database/models/Cart";
import Product from "../database/models/Product";
import Category from "../database/models/category";

interface CartData {
  id: string | null;
  quantity: number | null;
  createdAt: string | null;
  upadatedAt: string | null;
  userId: string | null;
  ProductId: string | null;
}
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
        include: [
          {
            model: Category,
            attributes: ["id", "categoryName"],
          },
        ],
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

  async deleteMyCartItem(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    const { ProductId } = req.params;
    // check whether above ProductId exist or not
    const product = await Product.findByPk(ProductId);
    if (!ProductId) {
      res.status(404).json({
        message: "No Product with that id",
      });
      return;
    }

    //delete the productId
    Cart.destroy({
      where: {
        userId,
        ProductId,
      },
    });
    res.status(200).json({
      message: "Product of cart dleted successfully",
    });
  }

  async updateCartItem(req: AuthRequest, res: Response): Promise<void> {
    const { ProductId } = req.params;
    const userId = req.user?.id;
    const { quantity } = req.body;
    if (!quantity) {
      res.status(404).json({
        message: "please provide quantity",
      });
      return;
    }
    const cartData = await Cart.findOne({
      where: {
        userId,
        ProductId,
      },
    });
    if (cartData) {
      cartData.quantity = quantity;
      await cartData?.save();
      res.status(200).json({
        message: "Product of cart updated successfully",
      });
    } else {
      res.status(404).json({
        message: "No Productid of that userId",
      });
    }
  }
}

export default new CartController();

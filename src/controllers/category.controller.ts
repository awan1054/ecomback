import Category from "../database/models/category";

import { Request, Response } from "express";

class CategoryController {
  categoryData = [
    {
      categoryName: "Electronics",
    },
    {
      categoryName: "Groceries",
    },
    {
      categoryName: "Food/Beverages",
    },
  ];
  async seedCategory(): Promise<void> {
    const datas = await Category.findAll();
    if (datas.length == 0) {
      const data = await Category.bulkCreate(this.categoryData);

      console.log("Categories seeded successfully");
    } else {
      console.log("Categories already seeded");
    }
  }

  async addCategory(req: Request, res: Response): Promise<void> {
    const { categoryName } = req.body;
    if (!categoryName) {
      res.status(400).json({
        message: "Please Provide category name",
      });
      return;
    }
    await Category.create({
      categoryName,
    });
    res.status(200).json({
      message: "Category added succesfully",
    });
  }

  async getCategory(req: Request, res: Response): Promise<void> {
    const data = await Category.findAll();
    res.status(200).json({
      message: "Category fetched",
      data: data,
    });
  }

  async deleteCategory(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const data = await Category.findAll({
      where: {
        id: id,
      },
    });
    if (data.length == 0) {
      res.status(404).json({
        message: "No category with that id",
      });
    } else {
      await Category.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).json({
        message: "Category deletd successfully",
      });
    }
  }

  async updateCategory(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const { categoryName } = req.body;
    await Category.update(
      { categoryName },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(200).json({
      message: "Category updated",
    });
  }
}

export default new CategoryController();

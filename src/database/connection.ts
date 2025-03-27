import { Sequelize } from "sequelize-typescript";
import User from "./models/userModel";
import Product from "./models/Product";
import Category from "./models/category";
import Cart from "./models/Cart";

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: "mysql",
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  models: [__dirname + "/models"],
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

sequelize.sync({ force: false }).then(() => {
  console.log("synced!!!");
});

//relationship

User.hasMany(Product, { foreignKey: "userId" });
Product.belongsTo(User, { foreignKey: "userId" });

Category.hasOne(Product, { foreignKey: "CategoryId" });
Product.belongsTo(Category, {
  foreignKey: "CategoryId",
});

Product.hasMany(Cart, { foreignKey: "ProductId" });
Cart.belongsTo(Product, {
  foreignKey: "ProductId",
});

User.hasMany(Cart, {
  foreignKey: "userId",
});
Cart.belongsTo(User, { foreignKey: "userId" });

export default sequelize;

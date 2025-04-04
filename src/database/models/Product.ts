import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "products",
  modelName: "Product",
  timestamps: true,
})
class Product extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare productname: string;

  @Column({
    type: DataType.TEXT,
  })
  declare productdescription: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare productPrice: number;
  @Column({
    type: DataType.INTEGER,
  })
  declare productTotalStockQty: number;
  @Column({
    type: DataType.STRING,
  })
  declare productImageUrl: string;
}

export default Product;

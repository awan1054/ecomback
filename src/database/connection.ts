import { Sequelize } from "sequelize-typescript";

const sequelize=new Sequelize({
    database: process.env.DB_NAME,
    dialect:"mysql",
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_PASSWORD,
    port:Number(process.env.DB_PORT)
    ,
    models:[__dirname+"/models"]
})

sequelize.authenticate().then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err)
})

sequelize.sync({force:false}).then(()=>{
console.log("synced!!!")
})

export default sequelize
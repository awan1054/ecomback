import express,{Application,Request,Response} from "express"

const app:Application=express()
const port:number=4000
 import * as dotenv from "dotenv"
 dotenv.config()

import "./database/connection"

import userRoute from "./routes/userRoute"
import adminSeeder from "./adminSeeder"
app.use(express.json())
adminSeeder()
app.use("/",userRoute)

app.listen(port,()=>{
    console.log("server running at ",port)
})
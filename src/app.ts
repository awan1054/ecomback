import express,{Application,Request,Response} from "express"

const app:Application=express()
const port:number=4000
 import * as dotenv from "dotenv"
 dotenv.config()

import "./database/connection"

app.get("/",(req:Request,res:Response)=>{
    res.send("hello world")
})
app.get("/about",(req:Request,res:Response)=>{
    res.send("about")
})
app.get("/contact",(req:Request,res:Response)=>{
    res.send("contact page")
})

app.listen(port,()=>{
    console.log("server running at ",port)
})
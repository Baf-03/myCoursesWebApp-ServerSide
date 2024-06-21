import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import router from "./routes/index.js";

const PORT = process.env.port || 3000;
const app = express();

const URI = `mongodb+srv://bilal:bilal@cluster0.oqstikf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(URI)
mongoose.connection.on("connected",()=>console.log("mongoDb Connected"))
mongoose.connection.on("error",()=>console.log("Error Connnecting to db"))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(router)

app.get("/",(req,res)=>{
    res.json("server is up")
})

app.listen(PORT,()=>{
    console.log("server is running at http://localhost:3000")
})
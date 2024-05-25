import express from "express";
import cors from "cors";
import compression from "compression";
import routes from "./routes/index.js";
(async ()=>{
    const app=express();
    console.log(process.env)
    app
    .use(cors())
    .use(compression())
    .use(express.static("public"))
    .use(express.json())
    .use(express.urlencoded({
        extended:true
    }))
    .use(routes)
    .use((r,s)=>{
        s.json({
            status:"success",
            message:"Reached to fallback route"
        })
    })
    .listen(process.env.port??3000);
})();
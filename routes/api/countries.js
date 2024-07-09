import { Router } from "express";
import fs from "fs";
// let data=fs.readdirSync(".");

const router=Router();
router.get("/",(req,res)=>{
    let data=JSON.parse(fs.readFileSync("./databank/theworld.json","utf-8"));
    let countries=Object.values(data).map(cn=>{
        delete(cn.states);
        return cn;
    });
    return res.json({countries})
})
router.get("/:cn",(req,res)=>{
    let data=JSON.parse(fs.readFileSync("./databank/theworld.json","utf-8"));
    let cn=req.params.cn.toUpperCase();
    if(cn in data){
        const country=data[cn];
        // delete(country["states"]);
        return res.json({country})
    }
    return res.json({
        status:"error",
        message:"Invalid request"
    })
})
export default router;
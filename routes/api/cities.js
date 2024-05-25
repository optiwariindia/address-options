import { Router } from "express";
import fs from "fs";
// let data=fs.readdirSync(".");
let data=JSON.parse(fs.readFileSync("./databank/theworld.json","utf-8"));
const router=Router();
router.get("/",(req,res)=>{
    if(!req.query.cn || !req.query.state){
        return res.json({
            status:"error",
            message:"Invalid request"
        })
    }
    let cn=req.query.cn.toUpperCase();
    let st=req.query.state.toUpperCase();
    if(cn in data && st in data[cn]["states"]){
        let cities=data[cn]['states'][st]["cities"];
        return res.json({
            cities
        })
    }
    return res.json({
        status:"error",
        message:"Invalid country code"
    })
})
export default router;
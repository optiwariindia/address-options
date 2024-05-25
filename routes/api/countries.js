import { Router } from "express";
import fs from "fs";
// let data=fs.readdirSync(".");
let data=JSON.parse(fs.readFileSync("./databank/theworld.json","utf-8"));
const router=Router();
router.get("/",(req,res)=>{
    let countries=Object.values(data).map(cn=>{
        delete(cn.states);
        return cn;
    });
    return res.json({countries})
})
export default router;
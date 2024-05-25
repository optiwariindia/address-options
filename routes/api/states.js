import { Router } from "express";
import fs from "fs";
// let data=fs.readdirSync(".");
let data=JSON.parse(fs.readFileSync("./databank/theworld.json","utf-8"));
const router=Router();
router.get("/",(req,res)=>{
    if(!req.query.cn){
        return res.json({
            status:"error",
            message:"Invalid request"
        })
    }
    let cn=req.query.cn.toUpperCase();
    if(cn in data){
        let states=data[cn]['states'];
        states=(states instanceof Array)?states.map(st=>{
            delete(st.cities);
            return st;
        }):Object.values(states).map(st=>{
            delete(st.cities);
            return st;
        });
        return res.json({
            states
        })
    }
    return res.json({
        status:"error",
        message:"Invalid country code"
    })
})
export default router;
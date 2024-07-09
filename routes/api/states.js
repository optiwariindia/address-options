import { Router } from "express";
import fs from "fs";
const router=Router();
router.get("/",(req,res)=>{
    let data=JSON.parse(fs.readFileSync("./databank/theworld.json","utf-8"));
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
router.get("/:cn/:st",async (req,res)=>{
    let data=JSON.parse(fs.readFileSync("./databank/theworld.json","utf-8"));
    if(!(req.params.cn.toUpperCase() in data))return res.json({
        status:"error",
        message:"Invalid country code"
    });
    const country=data[req.params.cn.toUpperCase()];
    if(!(req.params.st.toUpperCase() in country['states']))return res.json({
        status:"error",
        message:"Invalid state code"
        });
    const state=country['states'][req.params.st.toUpperCase()];
    return res.json({
        cities:state.cities
    });
})
export default router;
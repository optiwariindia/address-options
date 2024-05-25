import { Router } from "express";
import {
    countries,
    states,
    cities
} from "./api/index.js";
const router = Router();
router
    .use("/api/v1/countries", countries)
    .use("/api/v1/states", states)
    .use("/api/v1/cities", cities)

export default router;
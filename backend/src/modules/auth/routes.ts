import { Router } from "express";
import { signUp } from "./controller.ts";


const authRoutes = Router();

authRoutes.post("/signUp", signUp);

export default authRoutes;
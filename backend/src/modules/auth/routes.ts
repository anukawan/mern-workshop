import { Router } from "express";
import { signUp } from "./controller.ts";
import { login } from "./controller.ts";


const authRoutes = Router();

authRoutes.post("/signUp", signUp);
authRoutes.post("/login", login);

export default authRoutes;
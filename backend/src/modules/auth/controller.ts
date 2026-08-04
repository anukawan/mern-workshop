import type { Request, Response } from "express";
import {
    signUpService,
    loginService,
} from "./service.ts";

export const signUp = async (
    req: Request,
    res: Response
) => {
    try {
        const { email, password, name } = req.body;

        const userResponse = await signUpService(
            name,
            email,
            password
        );

        return res
            .status(userResponse.statusCode || 201)
            .json(userResponse);

    } catch (error) {
        console.error("Signup error:", error);

        return res.status(500).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Signup failed",
        });
    }
};

export const login = async (
    req: Request,
    res: Response
) => {
    try {
        const { email, password } = req.body;

        const userResponse = await loginService(
            email,
            password
        );

        return res
            .status(userResponse.statusCode || 200)
            .json(userResponse);

    } catch (error) {
        console.error("Login error:", error);

        return res.status(500).json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Login failed",
        });
    }
};
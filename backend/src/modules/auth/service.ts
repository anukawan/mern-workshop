import { createUserService, login } from "../user/service.ts";
import jwt from "jsonwebtoken";

export const signUpService = async (
    name: string,
    email: string,
    password: string
) => {
    const result = await createUserService(
        name,
        email,
        password
    );

    if (!result.success) {
        return result;
    }

    const jwtToken = jwt.sign(
        { email },
        process.env.JWT_SECRET || "anu123",
        {
            expiresIn: "1d",
        }
    );

    return {
        ...result,
        jwtToken,
    };
};

export const loginService = async (
    email: string,
    password: string
) => {
    const result = await login(email, password);

    const jwtToken = jwt.sign(
        { email },
        process.env.JWT_SECRET || "anu123",
        {
            expiresIn: "1d",
        }
    );

    return {
        statusCode: 200,
        success: true,
        data: result,
        jwtToken,
    };
};
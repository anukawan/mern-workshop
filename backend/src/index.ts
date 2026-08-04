import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import dns from "dns";

import connectDb from "./modules/config/db.ts";
import userRoutes from "./modules/user/routes.ts";
import authRoutes from "./modules/auth/routes.ts";

dotenv.config();

dns.setServers(["8.8.8.8"]);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: "*",
    })
);

// Test Route
app.get("/", (req: Request, res: Response) => {
    res.send("Hello, World!");
});

// Routes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);

// Server
const PORT = process.env.PORT || 5005;

const server = async () => {
    try {
        await connectDb();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

void server();
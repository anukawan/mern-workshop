import express, { Request, Response } from "express";
import connectDb from "./modules/config/db";
import userRoutes from "./modules/user/routes";
import authRoutes from "./modules/auth/routes";
import cors from "cors";
import dotenv from "dotenv";
import dns from "dns";

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

// Routes
app.get("/", (req: Request, res: Response) => {
    res.send("Hello, World!");
});

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

// Server
const PORT = process.env.PORT || 5005;

const server = async () => {
    await connectDb();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

void server();
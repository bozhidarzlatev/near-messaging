import path from 'path';
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { connectDB } from './lib/db.js';
import { ENV } from './lib/env.js';
import cookieParser from "cookie-parser"
import cors from "cors"
import { app, server } from './lib/socket.js';
import express from "express";

const __dirname = path.resolve()
const PORT = ENV.PORT || 3000

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(cookieParser());
app.use(cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT"],
}))


app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

if (ENV.NODE_ENV === "production") {
    app.use(exprese.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    })
}

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}!`);
    connectDB();
});

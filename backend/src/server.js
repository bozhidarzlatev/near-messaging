import express from 'express';
import path from 'path';
import authRoutes from "./routes/auth.route.js"
import { connectDB } from './lib/db.js';
import { ENV } from './lib/env.js';
import cookieParser from "cookie-parser"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const __dirname = path.resolve()

const PORT = ENV.PORT || 3000


app.use("/api/auth", authRoutes)

if(ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    })
}
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}!`);
    connectDB();
});

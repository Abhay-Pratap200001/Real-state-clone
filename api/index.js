import express from "express"
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload";
import path from 'path';


import { connectDB } from "./config/db.connection.js";
import userRouter from "./routes/user.route.js"
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import { errorHandler } from "./middleware/error.middleware,.js";

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;
const app = express();


app.use(express.json())
app.use(fileUpload({useTempFiles: true, tempFileDir: "/tmp/"})
);
app.use(cookieParser())


app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/listing", listingRouter)


app.use(express.static(path.join(__dirname, 'client/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

app.use(errorHandler);


// Connect DB and start server
connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });

    // Handle runtime errors gracefully
    server.on("error", (error) => {
      console.error("❌ Server Error:", error);
      process.exit(1);
    });
  }).catch((error) => {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1);
  });













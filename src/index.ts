import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/database";
import { v2 as cloudinary } from "cloudinary";

import myUserRoute from "./routes/MyUser.routes";
import myRestaurantRoute from "./routes/MyRestaurant.routes";
import restaurantRoute from "./routes/Restaurant.routes";
import orderRoute from "./routes/Order.routes";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(cors());

// keeps the request raw (not converted to json) so that stripe can verify it
app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

app.use(express.json());

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/order", orderRoute);

app.listen(7000, () => {
  console.log("Server started on localhost:7000");
  connectDB();
});

import express from "express";
import cors from "cors";
import { connectToDatabase } from "./config/database.js";
import router from "./routes/router.js";

const app = express();
const PORT = 5000 | process.env.PORT;

connectToDatabase();

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.listen(PORT, () =>
  console.log(`🚀 Server started at http://localhost:${5000}`)
);

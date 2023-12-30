
import "dotenv/config";
import mongoose from "mongoose";
import env from "./util/validateEnv"
import app from "./app";

const PORT = env.PORT;
const DB_URL = env.DB_URL;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("DB connect3d"); 
    app.listen(PORT, () => {
      console.log("Server running on " + PORT);
    });
  })
  .catch(console.error);

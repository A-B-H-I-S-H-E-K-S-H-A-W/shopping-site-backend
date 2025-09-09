import { app } from "./app.js";
import { register } from "./controllers/admin.controller.js";
import { connectDB } from "./db/db.js";
import { configDotenv } from "dotenv";
configDotenv();

const PORT = process.env.PORT || 8000;

connectDB()
  .then((data) => {
    console.log("MongoDB connection established ::::", data.connection.host);
    app.listen(PORT, () => {
      register();
      console.log(`Your server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed ::::", error);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});

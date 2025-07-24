// src/app.ts
import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import indexRoutes from "./routes/index";

const app = express();
const port = 3000;

// Setup view engine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

// Static file (CSS, JS)
app.use(express.static(path.join(__dirname, "..", "public")));

// Gunakan routing
app.use("/", indexRoutes);

// Jalankan server
app.listen(port, () => {
  console.log(`Server jalan di http://localhost:${port}`);
});

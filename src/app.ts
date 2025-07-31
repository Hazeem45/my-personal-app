import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
// import bodyParser from "body-parser";
import methodOverride from "method-override";
import indexRoutes from "./routes/index";
import { engine } from "express-handlebars";
import { handlebarsHelpers } from "./helpers/handlebarsHelper";

dotenv.config();
const app = express();
const port = 3000;

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.engine(
  "handlebars",
  engine({
    extname: ".handlebars",
    defaultLayout: "main",
    helpers: handlebarsHelpers,
  })
);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use("/", indexRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

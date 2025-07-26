// src/routes/index.ts
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

router.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact", formStyle: "form" });
});

router.get("/project", (req, res) => {
  res.render("project", { title: "My Project", formStyle: "form" });
});

export default router;

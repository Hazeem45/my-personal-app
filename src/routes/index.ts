// src/routes/index.ts
import { Router } from "express";
import {
  deleteProject,
  editProject,
  handleAddProject,
  handleContactForm,
  showContactPage,
  showHomePage,
  showProjectPage,
} from "../controllers";
import uploadMulter from "../middlewares/uploadMulter";

const router = Router();

router.get("/", showHomePage);
router.get("/contact", showContactPage);
router.post("/contact", handleContactForm);
router.get("/project", showProjectPage);
router.post("/project", uploadMulter, handleAddProject);
router.delete("/project/:id", deleteProject);
router.put("/project/:id", uploadMulter, editProject);

export default router;

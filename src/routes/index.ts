// src/routes/index.ts
import { Router } from "express";
import {
  deleteProject,
  editProject,
  handleAddProject,
  handleContactForm,
  handleLogin,
  handleLogout,
  handleRegister,
  showContactPage,
  showHomePage,
  showLoginPage,
  showProjectPage,
  showRegisterPage,
} from "../controllers";
import uploadMulter from "../middlewares/uploadMulter";
import { isAuthenticated } from "../middlewares/auth";

const router = Router();

router.get("/", showHomePage);
router.get("/contact", showContactPage);
router.post("/contact", handleContactForm);
router.get("/project", showProjectPage);
router.post("/project", isAuthenticated, uploadMulter, handleAddProject);
router.delete("/project/:id", isAuthenticated, deleteProject);
router.put("/project/:id", isAuthenticated, uploadMulter, editProject);

// authentication
router.get("/login", showLoginPage);
router.post("/login", handleLogin);
router.get("/register", showRegisterPage);
router.post("/register", handleRegister);
router.get("/logout", handleLogout);

export default router;

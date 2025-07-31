import { Request, Response } from "express";
import {
  createContact,
  createProject,
  deleteProjectById,
  getAllProjects,
  getProjectById,
  updateProject,
} from "../models";
import { Contact, ProjectData } from "../types";
import { formatProjects } from "../helpers/formatProject";
import fs from "fs";
import path from "path";

export const showHomePage = (req: Request, res: Response): void => {
  res.render("home", { title: "Home" });
};

export const showContactPage = (req: Request, res: Response): void => {
  res.render("contact", { title: "Contact", formStyle: true });
};

export const handleContactForm = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, email, phone, subject, message }: Contact = req.body;

  try {
    await createContact({
      name,
      email,
      phone: phone?.trim() || null,
      subject,
      message,
    });

    res.render("contact", {
      title: "Contact Me",
      formStyle: true,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const showProjectPage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projects = await getAllProjects();
    const formattedProjects = formatProjects(projects);

    let formValues = {
      project_name: "",
      start_date: "",
      end_date: "",
      description: "",
      technologies: [],
      filename: "",
    };

    let isEdit = false;

    if (req.query.edit) {
      const id = req.query.edit as string;
      isEdit = true;

      const foundProject = await getProjectById(id);
      if (foundProject) {
        formValues = {
          ...foundProject,
          start_date: foundProject.start_date.toISOString().slice(0, 10), // format for input[type="date"]
          end_date: foundProject.end_date.toISOString().slice(0, 10),
        };
        isEdit = true;
      } else {
        res.status(404).send("Project not found.");
        return;
      }
    }

    res.render("project", {
      title: "My Project",
      formStyle: true,
      projectStyle: true,
      formAction: isEdit
        ? `/project/${req.query.edit}?_method=PUT`
        : "/project",
      projects: formattedProjects,
      isEdit,
      formValues,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const handleAddProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    project_name,
    start_date,
    end_date,
    description,
    technologies,
  }: ProjectData = req.body;

  const techList: string[] = Array.isArray(technologies)
    ? technologies
    : [technologies];

  const imageFile = req.file;
  if (!imageFile) {
    res.status(400).send("Image must be uploaded.");
    return;
  }

  try {
    await createProject({
      project_name,
      start_date,
      end_date,
      description,
      technologies: techList,
      filename: imageFile.filename,
    });

    res.redirect("/project");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const editProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const projectId = req.params.id;
  const {
    project_name,
    start_date,
    end_date,
    description,
    technologies,
  }: ProjectData = req.body;

  const techList: string[] = Array.isArray(technologies)
    ? technologies
    : [technologies];

  try {
    const oldProject = await getProjectById(projectId);
    if (!oldProject) {
      res.status(404).send("Project not found.");
      return;
    }

    const uploadedImage = req.file?.filename;

    if (uploadedImage && uploadedImage !== oldProject.filename) {
      const oldImagePath = path.join(
        __dirname,
        "../../uploads",
        oldProject.filename
      );
      fs.unlink(oldImagePath, (err) => {
        if (err && err.code !== "ENOENT") {
          console.error("Failed to delete old image:", err);
        }
      });
    }

    await updateProject(projectId, {
      project_name,
      start_date,
      end_date,
      description,
      technologies: techList,
      filename: uploadedImage ?? oldProject.filename,
    });

    res.redirect("/project");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export async function deleteProject(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const project = await getProjectById(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const filePath = path.join(__dirname, "../../uploads", project.filename);
    console.log(filePath);

    fs.unlink(filePath, (err) => {
      if (err && err.code !== "ENOENT") {
        console.error("Failed to delete file:", err);
      }
    });
    await deleteProjectById(id);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

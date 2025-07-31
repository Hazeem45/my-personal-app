import database from "../database";
import { Contact, ProjectData } from "../types";

export const createContact = async (data: Contact): Promise<void> => {
  const { name, email, phone, subject, message } = data;

  await database.query(
    `INSERT INTO contacts (name, email, phone, subject, message)
     VALUES ($1, $2, $3, $4, $5)`,
    [name, email, phone, subject, message]
  );
};

export const createProject = async (
  project: ProjectData & { filename: string }
) => {
  const {
    project_name,
    start_date,
    end_date,
    description,
    technologies,
    filename,
  } = project;

  await database.query(
    `
    INSERT INTO projects (project_name, start_date, end_date, description, technologies, filename)
    VALUES ($1, $2, $3, $4, $5, $6)
  `,
    [project_name, start_date, end_date, description, technologies, filename]
  );
};

export const getAllProjects = async () => {
  const result = await database.query(
    "SELECT * FROM projects ORDER BY id DESC"
  );
  return result.rows;
};

export const getProjectById = async (id: string): Promise<any | null> => {
  const result = await database.query("SELECT * FROM projects WHERE id = $1", [
    id,
  ]);
  return result.rows[0] ?? null;
};

export const updateProject = async (
  id: string,
  project: ProjectData & { filename: string }
): Promise<void> => {
  const {
    project_name,
    start_date,
    end_date,
    description,
    technologies,
    filename,
  } = project;

  await database.query(
    `
    UPDATE projects SET project_name = $1, start_date = $2, end_date = $3, description = $4, technologies = $5, filename = $6 
    WHERE id = $7
    `,
    [
      project_name,
      start_date,
      end_date,
      description,
      technologies,
      filename,
      id,
    ]
  );
};

export async function deleteProjectById(id: string) {
  await database.query("DELETE FROM projects WHERE id = $1", [id]);
}

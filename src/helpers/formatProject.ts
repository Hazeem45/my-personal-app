import { FormattedProject, RawProject } from "../types";

export function formatProjects(projects: RawProject[]): FormattedProject[] {
  return projects.map((project) => {
    const start = new Date(project.start_date);
    const end = new Date(project.end_date);
    const months = Math.floor(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30)
    );
    const duration = months > 0 ? `${months} month` : "less than a month";

    return {
      id: project.id,
      name: project.project_name,
      year: start.getFullYear(),
      description: project.description,
      duration,
      image: `/uploads/${project.filename}`,
      technologies: project.technologies,
    };
  });
}

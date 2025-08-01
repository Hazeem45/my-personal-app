export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export interface Contact {
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
}

export interface ProjectData {
  project_name: string;
  start_date: string;
  end_date: string;
  description: string;
  technologies: string | string[];
}

export type RawProject = {
  id: number;
  project_name: string;
  start_date: string;
  end_date: string;
  description: string;
  filename: string;
  technologies: string[];
};

export type FormattedProject = {
  id: number;
  name: string;
  year: number;
  description: string;
  duration: string;
  image: string;
  technologies: string[];
};

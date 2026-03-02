import { Project } from "../features/projects";

export const createProject = (projects: Project[]): Project[] => {
  const project: Project = {
    id: crypto.randomUUID(),
    title: 'New Project',
    color: '#' +
      (0x1000000 + Math.random() * 0xffffff)
        .toString(16)
        .substr(1, 6),
    description: "",
    createdAt: new Date().toISOString()
  };

  return [...projects, project];
};

export const updateProjectTitle = (
  projects: Project[],
  projectId: string,
  title: string
) => {
  return projects.map(p =>
    p.id === projectId ? { ...p, title } : p
  );
};

export const deleteProject = (
  projects: Project[],
  id: string
) => {
  return projects.filter(p => p.id !== id);
};

import { Project } from "../features/projects";

export const createProject = (): Project => {
  const project: Project = {
    id: crypto.randomUUID(),
    title: 'New Project',
    color: '#' +
      (0x1000000 + Math.random() * 0xffffff)
        .toString(16)
        .slice(1, 7),
    description: "",
    createdAt: new Date().toISOString()
  };

  return project;
};

export const updateProjectTitle = (
  projects: Project[],
  projectId: string,
  title: string
): Project[] => {
  return projects.map(p =>
    p.id === projectId ? { ...p, title } : p
  );
};

export const deleteProject = (
  projects: Project[],
  id: string
): Project[] => {
  return projects.filter(p => p.id !== id);
};

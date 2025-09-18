import { Project } from "../features/projects";

export const createProject = (
  projects: Project[], 
  setProjects: (projects: Project[]) => void
): Project => {
  const project: Project = {
    id: crypto.randomUUID(),
    title: 'New Project',
    color: '#' + 
      (0x1000000+Math.random()*0xffffff)
        .toString(16)
        .substr(1,6),
    description: "",
    createdAt: new Date().toISOString()
  };

  setProjects([...projects, project]);
  return project;
};

export const updateProjectTitle = (
  projects: Project[], 
  setProjects: (projects: Project[]) => void, 
  projectId: string, 
  title: string
) => {
  const updatedProjects = projects.map(p => 
    p.id === projectId ? {...p, title} : p
  );
  setProjects(updatedProjects);
};

export const deleteProject = (
  projects: Project[], 
  setProjects: (projects: Project[]) => void, 
  id: string
) => {
  const updatedProjects = projects.filter(p => p.id !== id);
  setProjects(updatedProjects);

  return updatedProjects;
};
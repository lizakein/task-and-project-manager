export const createProject = (projects, setProjects) => {
  const project = {
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

export const updateProjectTitle = (projects, setProjects, projectId, title) => {
  const updatedProjects = projects.map(p => 
    p.id === projectId ? {...p, title} : p
  );
  setProjects(updatedProjects);
};

export const deleteProject = (projects, setProjects, id) => {
  const updatedProjects = projects.filter(p => p.id !== id);
  setProjects(updatedProjects);

  return updatedProjects;
};
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
import { Header } from "@layout/Header/Header";
import { Sidepanel } from "@layout/Sidepanel/Sidepanel";
import { useStore } from "@store/useStore";
import { useNavigate } from "react-router-dom";
import "./ProjectsPage.css";

export function ProjectsPage() {
  const navigate = useNavigate();
  
  const projects = useStore(state => state.projects);
  const addNewProject = useStore(state => state.addProject);

  const hasProjects = projects.length > 0;

  const handleCreateProject = () => {
    const newProject = addNewProject();
    navigate(`/project/${newProject.id}`);
  };

  return (
    <main className="page projects-page">
      <Header />
      <Sidepanel projectId={null} />

      <div className="content projects-page__content">
        { hasProjects ? (
          <p className="projects-page__text">
            Select a project from the list on the left to get started.
          </p>
        ) : (
          <>
            <p className="projects-page__text">
              You don't have any projects yet.
            </p>
            <button 
              className="button button--primary" 
              onClick={handleCreateProject}
            >
              Create new project
            </button>
          </>        
        )}
      </div>
    </main>
  );
}
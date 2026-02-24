import { useStore } from "@store/useStore";
import { useNavigate } from "react-router-dom";
import "./ProjectsPage.css";
import { Layout } from "@layout/Layout/Layout";

export function ProjectsPage() {
  const navigate = useNavigate();

  const projects = useStore((state) => state.projects);
  const addNewProject = useStore((state) => state.addProject);

  const hasProjects = projects.length > 0;

  const handleCreateProject = () => {
    const newProject = addNewProject();
    navigate(`/project/${newProject.id}`);
  };

  return (
    <Layout>
      <div className="projects-page__content">
        {hasProjects ? (
          <p className="projects-page__text">
            Select a project from the list on the left to get started.
          </p>
        ) : (
          <>
            <p className="projects-page__text">
              You don&apos;t have any projects yet.
            </p>
            <button
              type="button"
              className="button button--primary"
              onClick={handleCreateProject}
            >
              Create new project
            </button>
          </>
        )}
      </div>
    </Layout>
  );
}

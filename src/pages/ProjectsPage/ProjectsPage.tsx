import { useNavigate } from "react-router-dom";
import { Layout } from "@layout/Layout/Layout";
import { useProjectsStore } from "@store/hooks";
import { Button } from "@ui/index";
import { createProject } from "@utils/projectUtils";
import "./ProjectsPage.css";

export function ProjectsPage() {
  const navigate = useNavigate();

  const { projects, addProject } = useProjectsStore();

  const hasProjects = projects.length > 0;

  const handleCreateProject = () => {
    const newProject = createProject();
    addProject(newProject);
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
            <Button variant="primary" onClick={handleCreateProject}>
              Create new project
            </Button>
          </>
        )}
      </div>
    </Layout>
  );
}

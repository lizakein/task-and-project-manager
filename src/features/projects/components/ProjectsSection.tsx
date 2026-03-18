import { useNavigate } from "react-router-dom";
import { ProjectItem } from "./ProjectItem";
import AddSquareIcon from "@assets/icons/actions/add-square-icon.svg";
import { useProjectsStore } from "@store/hooks";
import { Icon, IconButton } from "@ui/index";
import { createProject } from "@utils/projectUtils";
import "./ProjectsSection.css";

interface ProjectsSection {
  projectId: string | null;
}

export default function ProjectsSection({ projectId }: ProjectsSection) {
  const navigate = useNavigate();

  const { projects, addProject } = useProjectsStore();

  const handleCreateProject = () => {
    const newProject = createProject();
    addProject(newProject);
    navigate(`/project/${newProject.id}`);
  };

  return (
    <section className="projects-section">
      <header className="projects-section__header">
        <h2 className="projects-section__title">My projects</h2>
        <IconButton
          ariaLabel="Add new project"
          onClick={handleCreateProject}
          icon={<Icon src={AddSquareIcon} />}
        />
      </header>

      <ul className="projects-list">
        {projects?.map((project) => {
          return (
            <ProjectItem
              key={project.id}
              project={project}
              isActive={project.id === projectId}
            />
          );
        })}
      </ul>
    </section>
  );
}

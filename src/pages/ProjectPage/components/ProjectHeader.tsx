import { useEffect, useState } from "react";
import EditIcon from "@assets/icons/actions/edit-purple-icon.svg";
import ShareIcon from "@assets/icons/actions/share-icon.svg";
import { TaskFilter } from "@features/tasks/components/TaskFilter/TaskFilter";
import { TaskSort } from "@features/tasks/components/TaskSort/TaskSort";
import { useContextMenu } from "@hooks/useContextMenu";
import { useProjectsStore } from "@store/hooks";
import { Icon, IconButton } from "@ui/index";

interface ProjectHeaderProps {
  projectId: string;
}

export function ProjectHeader({ projectId }: ProjectHeaderProps) {
  const contextMenu = useContextMenu();

  const { projects, updateProjectTitle } = useProjectsStore();
  const currentProject = projects.find((p) => p.id === projectId);

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (currentProject) setTitle(currentProject.title);
  }, [currentProject]);

  const editTitle = () => {
    if (!currentProject) return;

    if (isEditingTitle) {
      updateProjectTitle(projectId, title);
      setIsEditingTitle(false);
    } else {
      setIsEditingTitle(true);
    }
  };

  const updateTitleInput = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);

  const handleTitleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") editTitle();
    else if (event.key === "Escape") {
      setTitle(currentProject?.title || "");
      setIsEditingTitle(false);
    }
  };

  if (!currentProject) {
    return (
      <header className="project-header">
        <span
          className="project-header__title"
          role="status"
          aria-live="polite"
        >
          Загрузка...
        </span>
      </header>
    );
  }

  return (
    <header className="project-header">
      <div className="project-header__left">
        {isEditingTitle ? (
          <input
            type="text"
            className="project-header__title-input"
            value={title}
            aria-label="Project title"
            onChange={updateTitleInput}
            onKeyDown={handleTitleKeyDown}
            autoFocus
          />
        ) : (
          <h1 className="project-header__title">{currentProject.title}</h1>
        )}

        <div className="project-header__actions">
          <IconButton
            ariaLabel="Edit project title"
            onClick={editTitle}
            icon={<Icon src={EditIcon} />}
          />

          <IconButton
            ariaLabel="Share project"
            icon={<Icon src={ShareIcon} />}
          />
        </div>
      </div>

      <section className="task-controls" aria-label="Task controls">
        <TaskFilter contextMenu={contextMenu} />
        <TaskSort contextMenu={contextMenu} />
      </section>
    </header>
  );
}

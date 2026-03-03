import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import MoreIcon from "@assets/icons/actions/more-icon.svg";
import { ProjectOptions } from "./ProjectOptions";
import { useContextMenu } from "@hooks/useContextMenu";
import { Icon, IconButton } from "@ui/index";
import { Project } from "../types";

interface ProjectItemProps {
  project: Project;
  isActive: boolean;
}

export function ProjectItem({ project, isActive }: ProjectItemProps) {
  const navigate = useNavigate();
  const { openId, menuPosition, handleMoreClick, closeMenu } = useContextMenu();
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <li
      className={`projects-list__item ${
        isActive && `projects-list__item--active`
      }`}
      style={{ "--marker-color": project.color } as React.CSSProperties}
      onClick={() => {
        navigate(`/project/${project.id}`);
      }}
    >
      <span className="projects-list__name">{project.title}</span>
      <IconButton
        ref={buttonRef}
        ariaLabel={`More options for Project ${project.title}`}
        onClick={(e) => handleMoreClick(e, project.id)}
        icon={<Icon src={MoreIcon} />}
      />

      {openId === project.id && menuPosition && (
        <ProjectOptions
          menuPosition={menuPosition}
          openId={openId}
          title={project.title}
          onClose={closeMenu}
          triggerRef={buttonRef}
        />
      )}
    </li>
  );
}

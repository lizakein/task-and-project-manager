import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { OptionsWindow } from "@ui/OptionsWindow/OptionsWindow";
import { ConfirmModal } from "@ui/ConfirmModal/ConfirmModal";
import ArchiveIcon from "@assets/icons/actions/archive-icon.svg";
import TrashIcon from "@assets/icons/actions/trash-icon.svg";
import { MenuPosition } from "@hooks/useContextMenu";
import { useProjectsStore } from "@store/hooks";

interface ProjectOptionsProps {
  menuPosition: MenuPosition;
  openId: string;
  title: string;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export function ProjectOptions({
  menuPosition,
  openId,
  title,
  onClose,
  triggerRef,
}: ProjectOptionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { projectId } = useParams();

  const { projects, deleteProject } = useProjectsStore();

  const handleConfirmDelete = () => {
    deleteProject(openId);

    const isDeletedProjectActive = window.location.pathname.includes(openId);
    const updatedProjects = projects.filter((p) => p.id !== openId);

    if (isDeletedProjectActive) {
      setTimeout(() => {
        navigate(`/project/${updatedProjects[0]?.id || ""}`);
      }, 0);
    } else {
      setTimeout(() => {
        navigate(`/project/${projectId}`);
      }, 0);
    }

    setIsModalOpen(false);
    onClose?.();
  };

  const handleDeleteProject = () => {
    setIsModalOpen(true);
  };

  return (
    <OptionsWindow
      position={menuPosition}
      onClose={onClose}
      triggerRef={triggerRef}
      shouldReturnFocus={!isModalOpen}
      disableAutoFocus={isModalOpen}
    >
      <button className="options-window__item" role="menuitem" type="button">
        <img src={ArchiveIcon} alt="" role="presentation" />
        <span className="options-window__item-label">Archive</span>
      </button>
      <button
        className="options-window__item"
        role="menuitem"
        type="button"
        onClick={handleDeleteProject}
      >
        <img src={TrashIcon} alt="" role="presentation" />
        <span className="options-window__item-label red">Trash</span>
      </button>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Delete project"
        message={`Are you sure you want to delete the project: ${title}`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </OptionsWindow>
  );
}

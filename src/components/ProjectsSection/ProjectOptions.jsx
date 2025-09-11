import { useNavigate, useParams } from 'react-router-dom';
import { useState } from "react";
import { OptionsWindow } from '@ui/OptionsWindow';
import { useStore } from '@store/useStore';
import { ConfirmModal } from '@ui/ConfirmModal/ConfirmModal';
import ArchiveIcon from '@assets/icons/actions/archive-icon.svg';
import TrashIcon from '@assets/icons/actions/trash-icon.svg';

export function ProjectOptions({ menuPosition, openId, title }) {
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const navigate = useNavigate();
  const { projectId } = useParams();

  const projects = useStore(state => state.projects);
  const deleteProject = useStore(state => state.deleteProject);

  const handleConfirmDelete = () => {
    deleteProject(openId);

    const isDeletedProjectActive = window.location.pathname.includes(openId);
    const updatedProjects = projects.filter(p => p.id !== openId);

    if (isDeletedProjectActive) {
      setTimeout(() => {
        navigate(`/project/${updatedProjects[0]?.id || ''}`);
      }, 0);
    } else {
      setTimeout(() => {
        navigate(`/project/${projectId}`);
      }, 0);
    }

    setIsModalOpen(false);
  };

  const handleDeleteProject = () => {
    setIsModalOpen(true);
  };

  return (
    <OptionsWindow position={menuPosition}>
      <button className='options-window__item'>
        <img src={ArchiveIcon} alt="" role="presentation" />
        <span className='options-window__item-label'>Archive</span>
      </button>
      <button className='options-window__item' onClick={handleDeleteProject}>
        <img src={TrashIcon} alt="" role="presentation" />
        <span className='options-window__item-label red'>Trash</span>
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
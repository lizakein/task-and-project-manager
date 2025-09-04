import { OptionsWindow } from '../OptionsWindow';
import ArchiveIcon from '../../assets/icons/archive-icon.svg';
import TrashIcon from '../../assets/icons/trash-icon.svg';

export function ProjectOptions({ menuPosition }) {
  return (
    <OptionsWindow position={menuPosition}>
      <div className='options-window__item'>
        <img src={ArchiveIcon} alt="" role="presentation" />
        <span className='options-window__item-label'>Archive</span>
      </div>
      <div className='options-window__item'>
        <img src={TrashIcon} alt="" role="presentation" />
        <span className='options-window__item-label red'>Trash</span>
      </div>
    </OptionsWindow>
  );
}
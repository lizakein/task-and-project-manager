import { OptionsWindow } from "../../components/OptionsWindow";
import EditIcon from '../../assets/icons/actions/edit-icon.svg';
import TrashIcon from '../../assets/icons/actions/trash-icon.svg';

export function TaskOptions({ menuPosition }) {
  return(
    <OptionsWindow position={menuPosition}>
      <button className='options-window__item'>
        <img src={EditIcon} alt="" role="presentation" />
        <span className='options-window__item-label'>Edit</span>
      </button>
      <button className='options-window__item'>
        <img src={TrashIcon} alt="" role="presentation" />
        <span className='options-window__item-label red'>Trash</span>
      </button>
    </OptionsWindow>
  );
}
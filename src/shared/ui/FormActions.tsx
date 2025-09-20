import TrashIcon from "@assets/icons/actions/trash-icon.svg";

interface FormActionsProps {
  handleCancel: () => void;
};

export function FormActions({ handleCancel }: FormActionsProps) {
  return (
    <div className="edit-task-page__actions">
      <button 
        type="button" 
        className="button button--warning" 
        onClick={handleCancel}
      >
        <img src={TrashIcon} alt="" role="presentation" className="button__icon" />
        <span className="button__text">Cancel</span>
      </button>

      <button 
        className="button button--primary" 
        type="submit"
      >
        Save
      </button>
    </div>
  );
}
import TrashIcon from "@assets/icons/actions/trash-icon.svg";
import { Icon, Button } from "@ui/index";

interface FormActionsProps {
  handleCancel: () => void;
}

export function FormActions({ handleCancel }: FormActionsProps) {
  return (
    <div className="edit-task-page__actions">
      <Button
        variant="warning"
        onClick={handleCancel}
        leftIcon={<Icon src={TrashIcon} />}
      >
        <span className="button__text">Cancel</span>
      </Button>

      <Button variant="primary" type="submit">
        Save
      </Button>
    </div>
  );
}

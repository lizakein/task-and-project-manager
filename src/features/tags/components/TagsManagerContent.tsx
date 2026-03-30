import { useState, Dispatch, SetStateAction } from "react";
import AddIcon from "@assets/icons/actions/add-square-icon.svg";
import CloseIcon from "@assets/icons/actions/close-icon.svg";
import { useTagStore } from "@store/hooks";
import { Button, Icon, IconButton } from "@ui/index";
import { TagsList } from "./TagsList";
import { TagsInput } from "./TagsInput";

interface TagsManagerContentProps {
  setIsTagsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export function TagsManagerContent({
  setIsTagsModalOpen,
}: TagsManagerContentProps) {
  const { tags, addTag } = useTagStore();
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isWarning, setIsWarning] = useState<boolean>(false);

  return (
    <>
      <div className="tags-manager-modal__header">
        <IconButton
          className="close-icon"
          ariaLabel="Close tags manager"
          onClick={() => setIsTagsModalOpen(false)}
          icon={<Icon src={CloseIcon} />}
        />
      </div>

      <TagsList />

      {isAdding ? (
        <TagsInput
          onSave={(newValue: string | null) => {
            if (newValue && !tags.some((t) => t.label === newValue)) {
              addTag(newValue, "blue");
              setIsAdding(false);
              setIsWarning(false);
            } else setIsWarning(true);
          }}
        />
      ) : (
        <Button
          aria-label="Add tag"
          onClick={() => setIsAdding(true)}
          leftIcon={<Icon src={AddIcon} />}
        >
          Add new tag
        </Button>
      )}

      {isWarning && (
        <p className="tags-manager-modal__warning" role="alert">
          Error: this tag is already exists
        </p>
      )}
    </>
  );
}

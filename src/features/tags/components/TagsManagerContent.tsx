import { useState } from "react";
import { TagsList } from "./TagsList";
import { TagsInput } from "./TagsInput";
import { Dispatch, SetStateAction } from "react";
import AddIcon from "@assets/icons/actions/add-square-icon.svg";
import CloseIcon from "@assets/icons/actions/close-icon.svg";
import { useTagStore } from "@store/hooks";

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
        <button
          type="button"
          className="icon-button close-icon"
          aria-label="Close tags manager"
          onClick={() => setIsTagsModalOpen(false)}
        >
          <img src={CloseIcon} alt="" role="presentation" />
        </button>
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
        <button
          type="button"
          className="button"
          aria-label="Add tag"
          onClick={() => setIsAdding(true)}
        >
          <img src={AddIcon} alt="" role="presentation" />
          Add new tag
        </button>
      )}

      {isWarning && (
        <p className="tags-manager-modal__warning" role="alert">
          Error: this tag is already exists
        </p>
      )}
    </>
  );
}

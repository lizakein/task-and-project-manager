import { useState } from "react";
import { useStore } from "@store/useStore";
import { TagsInput } from "./TagsInput";
import { ConfirmModal } from "@ui/ConfirmModal/ConfirmModal"
import EditIcon from "@assets/icons/actions/edit-icon.svg";
import DeleteIcon from "@assets/icons/actions/trash-icon.svg";

export function TagsList() {
  const allTags = useStore(state => state.tags);
  const updateTag = useStore(state => state.updateTag);
  const deleteTag = useStore(state => state.deleteTag);

  const [ editingIndex, setEditingIndex ] = useState(null);
  const [ deletingTagId, setDeletingTagId ] = useState(null);

  const handleConfirmDelete = () => {
    if (deletingTagId) {
      deleteTag(deletingTagId);
      setDeletingTagId(null);
    } 
  }

  return (
    <>
      {allTags.map(tag => {
        return (
          <div key={tag.id} className="tags-manager-modal__item">
            { editingIndex === tag.id ? (
              <TagsInput 
                initialValue={tag.label}
                onSave={(newValue) => {
                  if (newValue)
                    updateTag(tag.id, {label: newValue});
                  setEditingIndex(null);
                }}
              />
            ) : (
              <>
                <span className="tags-manager-modal__marker">
                  •
                </span>
                <button type="button" className={`tag tag--${tag.color}`}>
                  {tag.label}
                </button>

                <div className="tags-manager-modal__actions">
                  <button
                    type="button" 
                    className="icon-button" 
                    aria-label="Edit tag label"
                    onClick={() => setEditingIndex(tag.id)}
                  >
                    <img src={EditIcon} alt="" role="presentation" />
                  </button>

                  <button
                    type="button" 
                    className="icon-button" 
                    aria-label="Delete tag"
                    onClick={() => setDeletingTagId(tag.id)}
                  >
                    <img src={DeleteIcon} alt="" role="presentation" />
                  </button>

                </div>	
              </>					
            )}
          </div>         
        );
      })}

      <ConfirmModal 
        isOpen={deletingTagId !== null}
        title="Delete tag"
        message="Are you sure you want to delete this tag? It will be deleted in all tasks."
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingTagId(null)}
      />
    </>
  );
}
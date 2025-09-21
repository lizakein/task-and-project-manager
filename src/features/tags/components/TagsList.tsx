import { useState } from "react";
import { useStore } from "@store/useStore";
import { TagsInput } from "./TagsInput";
import { ConfirmModal } from "@ui/ConfirmModal/ConfirmModal";
import EditIcon from "@assets/icons/actions/edit-icon.svg";
import DeleteIcon from "@assets/icons/actions/trash-icon.svg";
import { TAG_COLORS } from "@constants/tagColors";
import { getTagStyle } from "@utils/tagUtils";

export function TagsList() {
  const allTags = useStore(state => state.tags);
  const updateTag = useStore(state => state.updateTag);
  const deleteTag = useStore(state => state.deleteTag);

  const [ editingIndex, setEditingIndex ] = useState<string | null>(null);
  const [ deletingTagId, setDeletingTagId ] = useState<string | null>(null);
  const [ openPaletteFor, setOpenPaletteFor] = useState<string | null>(null);

  const handleConfirmDelete = () => {
    if (deletingTagId) {
      deleteTag(deletingTagId);
      setDeletingTagId(null);
    } 
  };

  return (
    <>
      {allTags.map(tag => {
        const isOpen = openPaletteFor === tag.id;
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
                <div className="tags-manager-modal__left">
                  <div className="color-picker">
                    <button 
                      type="button"
                      className="color-picker__current" 
                      style={{ backgroundColor: TAG_COLORS[tag.color as keyof typeof TAG_COLORS].text }}
                      onClick={() => setOpenPaletteFor(isOpen ? null : tag.id)}
                    />

                    <div className={`color-picker__menu ${isOpen ? "open" : ""}`}>
                      {Object.entries(TAG_COLORS).map(([colorKey, colorVal], i) => (
                        <button 
                          key={colorKey}
                          className="color-option"
                          style={{
                            backgroundColor: colorVal.text,
                            transitionDelay: `${i * 60}ms`
                          }}
                          onClick={() => {
                            updateTag(tag.id, { color: colorKey as keyof typeof TAG_COLORS });
                            setOpenPaletteFor(null);
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <button 
                    type="button" 
                    className={`tag tag--${tag.color}`} 
                    style={getTagStyle(tag.color as keyof typeof TAG_COLORS)}
                  >
                    {tag.label}
                  </button>
                </div>

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
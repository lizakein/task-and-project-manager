import { useState } from "react";
import { TagsInput } from "./TagsInput";
import { ConfirmModal } from "@ui/ConfirmModal/ConfirmModal";
import { Button, Icon, IconButton } from "@ui/index";
import EditIcon from "@assets/icons/actions/edit-icon.svg";
import DeleteIcon from "@assets/icons/actions/trash-icon.svg";
import { TAG_COLORS } from "@constants/tagColors";
import { getTagStyle } from "@utils/tagUtils";
import { useTagStore } from "@store/hooks";

interface TagsListProps {
  setIsWarning: React.Dispatch<React.SetStateAction<boolean>>;
}

export function TagsList({ setIsWarning }: TagsListProps) {
  const { tags, updateTag, deleteTag } = useTagStore();

  const [editingIndex, setEditingIndex] = useState<string | null>(null);
  const [deletingTagId, setDeletingTagId] = useState<string | null>(null);
  const [openPaletteFor, setOpenPaletteFor] = useState<string | null>(null);

  const handleConfirmDelete = () => {
    if (deletingTagId) {
      deleteTag(deletingTagId);
      setDeletingTagId(null);
    }
  };

  return (
    <>
      {tags.map((tag) => {
        const isOpen = openPaletteFor === tag.id;
        return (
          <div key={tag.id} className="tags-manager-modal__item">
            {editingIndex === tag.id ? (
              <TagsInput
                initialValue={tag.label}
                onSave={(newValue) => {
                  if (newValue && !tags.some((t) => t.label === newValue)) {
                    updateTag(tag.id, { label: newValue });
                    setIsWarning(false);
                    setEditingIndex(null);
                  } else setIsWarning(true);
                }}
              />
            ) : (
              <>
                <div className="tags-manager-modal__left">
                  <div className="color-picker">
                    <Button
                      className="color-picker__current"
                      style={{
                        backgroundColor:
                          TAG_COLORS[tag.color as keyof typeof TAG_COLORS],
                      }}
                      onClick={() => setOpenPaletteFor(isOpen ? null : tag.id)}
                    />

                    <div
                      className={`color-picker__menu ${isOpen ? "open" : ""}`}
                    >
                      {Object.entries(TAG_COLORS).map(
                        ([colorKey, colorVal], i) => (
                          <Button
                            key={colorKey}
                            className="color-option"
                            style={{
                              backgroundColor: colorVal,
                              transitionDelay: `${i * 60}ms`,
                            }}
                            onClick={() => {
                              updateTag(tag.id, {
                                color: colorKey as keyof typeof TAG_COLORS,
                              });
                              setOpenPaletteFor(null);
                            }}
                          />
                        )
                      )}
                    </div>
                  </div>

                  <span
                    className={`chip tag tag--${tag.color}`}
                    style={
                      {
                        "--tag-text": getTagStyle(
                          tag.color as keyof typeof TAG_COLORS
                        ).color,
                      } as React.CSSProperties
                    }
                  >
                    {tag.label}
                  </span>
                </div>

                <div className="tags-manager-modal__actions">
                  <IconButton
                    ariaLabel="Edit tag label"
                    onClick={() => setEditingIndex(tag.id)}
                    icon={<Icon src={EditIcon} />}
                  />

                  <IconButton
                    ariaLabel="Delete tag"
                    onClick={() => setDeletingTagId(tag.id)}
                    icon={<Icon src={DeleteIcon} className="icon--color" />}
                  />
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

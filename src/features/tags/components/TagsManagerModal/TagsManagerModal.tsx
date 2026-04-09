import { createPortal } from "react-dom";
import { TagsManagerContent } from "../TagsManagerContent";
import { FieldState } from "@app-types/fieldState";
import "./TagsManagerModal.css";

interface TagsManagerModalProps {
  isTagsModalOpen: FieldState<boolean>;
}

export function TagsManagerModal({ isTagsModalOpen }: TagsManagerModalProps) {
  if (!isTagsModalOpen.value) return null;

  return createPortal(
    <div className="overlay tags-manager-modal__overlay">
      <div className="window tags-manager-modal__window">
        <TagsManagerContent setIsTagsModalOpen={isTagsModalOpen.setValue} />
      </div>
    </div>,
    document.body
  );
}

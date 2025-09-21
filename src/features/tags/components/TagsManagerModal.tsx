import { createPortal } from "react-dom";
import { TagsManagerContent } from "./TagsManagerContent";
import './TagsManagerModal.css';
import { FieldState } from "types/fieldState";

interface TagsManagerModalProps {
	isTagsModalOpen: FieldState<boolean>;
}

export function TagsManagerModal({ isTagsModalOpen }: TagsManagerModalProps) {
	if (!isTagsModalOpen) return null;

	return createPortal(
		<div className="overlay tags-manager-modal__overlay">
			<div className="window tags-manager-modal__window">
				<TagsManagerContent setIsTagsModalOpen={isTagsModalOpen.setValue} />
			</div>	
		</div>,
		document.body
	);
}
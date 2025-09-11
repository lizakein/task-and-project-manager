import { createPortal } from "react-dom";
import { TagsManagerContent } from "./TagsManagerContent";
import './TagsManagerModal.css';

export function TagsManagerModal({ isTagsModalOpen, setIsTagsModalOpen }) {
	if (!isTagsModalOpen) return null;

	return createPortal(
		<div className="overlay tags-manager-modal__overlay">
			<div className="window tags-manager-modal__window">
				<TagsManagerContent setIsTagsModalOpen={setIsTagsModalOpen} />
			</div>	
		</div>,
		document.body
	);
}
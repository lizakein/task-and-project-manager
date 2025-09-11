import { createPortal } from "react-dom";
import { useState } from "react";
import { useStore } from "@store/useStore";
import { TagsInput } from "./TagsInput";
import EditIcon from "@assets/icons/actions/edit-icon.svg";
import DeleteIcon from "@assets/icons/actions/trash-icon.svg";
import AddIcon from "@assets/icons/actions/add-square-icon.svg";
import CloseIcon from "@assets/icons/actions/close-icon.svg";
import './TagsManagerModal.css';

export function TagsManagerModal({ isTagsModalOpen, setIsTagsModalOpen }) {
	if (!isTagsModalOpen) return null;

	const allTags = useStore(state => state.tags);
	const addTag = useStore(state => state.addTag);
	const updateTag = useStore(state => state.updateTag);
	const deleteTag = useStore(state => state.deleteTag);

	const [ isAdding, setIsAdding ] = useState(false);
	const [ editingIndex, setEditingIndex ] = useState(null);
	const [ isWarning, setIsWarning ] = useState(false);

	return createPortal(
		<div className="tags-manager-modal__overlay">
			<div className="tags-manager-modal__window">
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
									<button 
										type="button" 
										className={`tag tag--blue`}
									>
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
											onClick={() => deleteTag(tag.id)}
										>
											<img src={DeleteIcon} alt="" role="presentation" />
										</button>
									</div>	
								</>					
							)}
						</div>         
          );
        })}		

				{ isAdding ?
					<TagsInput
						onSave={(newValue) => {
							if (newValue && !allTags.some(t => t.label === newValue)) {
								addTag(newValue, 'blue');
								setIsAdding(false);
								setIsWarning(false);
							} else setIsWarning(true);
						}}
					/> : (
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
				{isWarning && <p className="tags-manager-modal__warning">Error: this tag is already exist</p>}
			</div>	
		</div>,
		document.body
	);
}
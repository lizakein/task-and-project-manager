import { createPortal } from "react-dom";
import { useEffect, useState, useRef } from "react";
import EditIcon from "../../../assets/icons/actions/edit-icon.svg";
import DeleteIcon from "../../../assets/icons/actions/trash-icon.svg";
import AddIcon from "../../../assets/icons/actions/add-square-icon.svg";
import CloseIcon from "../../../assets/icons/actions/close-icon.svg";
import './TagsManagerModal.css';

export function TagsManagerModal({ isTagsModalOpen, setIsTagsModalOpen, allTags, setAllTags }) {
	if (!isTagsModalOpen) return null;

	const [ isEditing, setIsEditing ] = useState(false);
	const [ newTag, setNewTag ] = useState('');

	const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current)
      inputRef.current.focus();
  }, [isEditing]);

	const addTag = () => {
		if (isEditing) {
			const newTagTrim = newTag.trim();
			if (newTag && !allTags.includes(newTag))
				setAllTags([...allTags, newTagTrim]);
			setIsEditing(false);
			setNewTag('');
		} else {
			setIsEditing(true);
		}
	};

	const updateTagsInput = event => setNewTag(event.target.value);

	const handleTagsKeyDown = (event) => {
		if (event.key === 'Enter') addTag();
		else if (event.key === 'Escape') {
			setIsEditing(false);
		}
	};

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
				{allTags.map((tag, index) => {
          return (
						<div key={tag} className="tags-manager-modal__item">
							<button 
								key={tag}
								type="button" 
								className={`tag tag--blue`}
							>
								{tag}
							</button>

							<div className="tags-manager-modal__actions">
								<button
									type="button" 
									className="icon-button" 
									aria-label="Edit tag label"
								>
									<img src={EditIcon} alt="" role="presentation" />
								</button>

								<button
									type="button" 
									className="icon-button" 
									aria-label="Delete tag"
									onClick={() => setAllTags(allTags.filter((_, i) => i !== index))}
								>
									<img src={DeleteIcon} alt="" role="presentation" />
								</button>
							</div>	
						</div>            
          );
        })}		
				{ isEditing ?          
					<input
						ref={inputRef}
						type='text'
						className="input-field"
						placeholder="Enter new tag"
						onChange={updateTagsInput}
						onKeyDown={handleTagsKeyDown}
					/> : (
						<button 
							type="button" 
							className="button" 
							aria-label="Add tag"
							onClick={addTag}
						>
							<img src={AddIcon} alt="" role="presentation" />
							Add new tag
						</button>
				)} 
			</div>	
		</div>,
		document.body
	);
}
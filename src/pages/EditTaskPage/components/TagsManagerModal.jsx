import { createPortal } from "react-dom";
import { useEffect, useState, useRef } from "react";
import EditIcon from "../../../assets/icons/actions/edit-icon.svg";
import DeleteIcon from "../../../assets/icons/actions/trash-icon.svg";
import AddIcon from "../../../assets/icons/actions/add-square-icon.svg";

export function TagsManagerModal({ isOpen, allTags, setAllTags }) {
	if (!isOpen) return null;

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
				{allTags.map((tag) => {
          return (
						<div key={tag} className="tags-manager-modal__item">
							<button 
								key={tag}
								type="button" 
								className={`tag tag--blue`}
							>
								{tag}
							</button>

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
							>
								<img src={DeleteIcon} alt="" role="presentation" />
							</button>
						</div>            
          );
        })}			
			</div>

			{ isEditing ?          
				<input
					ref={inputRef}
					type='text'
					className="input-field"
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
			
		</div>,
		document.body
	);
}
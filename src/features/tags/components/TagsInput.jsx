import { useTagInput } from "@hooks/useTagInput";

export function TagsInput(initialValue = '', onSave) {
	const { value, inputRef, handleChange, handleKeyDown } = useTagInput(initialValue, onSave);

  return (
		<input 
			ref={inputRef}
			type='text'
			value={value}
			className="input-field"
			placeholder="Enter tag"
			onChange={handleChange}
			onKeyDown={handleKeyDown}
		/>
	);
}
import { useTagInput } from "@hooks/useTagInput";

interface TagsInputProps {
	initialValue?: string;
	onSave: (value: string | null) => void;
};

export function TagsInput({ initialValue = '', onSave }: TagsInputProps) {
	const { value, inputRef, handleChange, handleKeyDown } = useTagInput({ initialValue, onSave });

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
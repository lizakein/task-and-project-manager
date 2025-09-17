import { useState, useEffect, useRef } from "react";

interface UseTagInputProps {
	initialValue?: string;
	onSave: (value: string | null) => void;
};

export function useTagInput({initialValue = '', onSave}: UseTagInputProps) {
	const [ value, setValue ] = useState<string>(initialValue ?? '');
	const inputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (inputRef.current) inputRef.current.focus();
	}, []);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			const trimmed = value.trim();
			if (trimmed) onSave(trimmed);
		}
		else if (event.key === 'Escape') onSave(null);
	};

	return { value, inputRef, handleChange, handleKeyDown };
}
import { useState, useEffect, useRef } from "react";

export function useTagInput({initialValue = '', onSave}) {
	const [ value, setValue ] = useState(initialValue);
	const inputRef = useRef(null);

	useEffect(() => {
		if (inputRef.current) inputRef.current.focus();
	}, []);

	const handleChange = event => setValue(event.target.value);

	const handleKeyDown = event => {
		if (event.key === 'Enter') {
			const trimmed = value.trim();
			if (trimmed) onSave(trimmed);
		}
		else if (event.key === 'Escape') onSave(null);
	};

	return { value, inputRef, handleChange, handleKeyDown };
}
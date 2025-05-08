import React from 'react';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';

interface SearchBarProps {
	initialQuery: string;
	onSearch: (value: string) => void;
}

function SearchBar({ initialQuery, onSearch }: SearchBarProps) {
	const [searchQuery, setSearchQuery] = useState(initialQuery);
	const debouncedSearchQuery = useDebounce(searchQuery, 250);

	const handleSearchChangeEvent = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setSearchQuery(event.target.value);
	};

	useEffect(() => {
		onSearch(debouncedSearchQuery);
	}, [debouncedSearchQuery, onSearch]);

	return (
		<TextField
			label="Search for an anime"
			variant="outlined"
			autoFocus
			fullWidth
			value={searchQuery}
			onChange={handleSearchChangeEvent}
		/>
	);
}

export default SearchBar;

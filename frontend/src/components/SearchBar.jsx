
const SearchBar = ({ handleSearch }) => {
	return (
			<div className="p-3 bg-gray-800">
				<input
					type="text"
					placeholder="Search"
					className="input h-10 input-bordered w-full bg-gray-700 text-gray-200 placeholder-gray-400"
					onChange={handleSearch}	
				/>
		</div>
	);
};

export default SearchBar;
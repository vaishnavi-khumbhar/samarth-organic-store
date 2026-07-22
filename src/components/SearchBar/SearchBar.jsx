import { Search } from "lucide-react";

const SearchBar = ({ setOpen }) => {
  return (
    <button
      onClick={() => setOpen(true)}
      className="cursor-pointer"
    >
      <Search />
    </button>
  );
};

export default SearchBar;
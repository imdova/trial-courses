import { Search } from "lucide-react";
type SearchInputProps = {
  SetSearchQuery: (query: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ SetSearchQuery }) => {
  return (
    <form
      className={`flex h-[40px] items-center rounded-full border border-gray-300 bg-white px-4 transition-all duration-300`}
    >
      <Search className="group-focus:text-primary mr-2 h-5 w-5 text-gray-400 transition-colors" />
      <input
        type="text"
        className="w-full border-none bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          SetSearchQuery(e.target.value);
        }}
        placeholder="Search here..."
      />
    </form>
  );
};

export default SearchInput;

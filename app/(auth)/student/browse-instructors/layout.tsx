import SearchBar from "./components/search-bar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full space-y-2 px-4 md:px-5">
      {/* Search and Filters Section */}
      <div>
        <h4 className="text-[30px] font-bold text-main">All Instructors</h4>
      </div>

      <SearchBar />

      {children}
    </div>
  );
};

export default layout;

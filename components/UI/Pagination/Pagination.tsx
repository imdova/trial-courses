type PaginationProps = {
  total: number;
  PerPage: number;
  paginate: (page: number) => void; // Fixed type
  currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({
  total,
  PerPage,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  // Calculate total number of pages
  for (let i = 1; i <= Math.ceil(total / PerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination flex justify-center gap-2 my-3">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              className={`page-item flex justify-center items-center w-10 h-10 text-xs cursor-pointer text-gray-500 border hover:border-primary hover:text-primary   rounded-lg ${
                currentPage === number ? "bg-primary !text-white" : ""
              }`}
              onClick={() => paginate(number)}>
              {number}
            </button>
          </li>
        ))}

        {/* Handle case when there is only one page */}
        {pageNumbers.length === 1 && (
          <li className="page-item">
            <span className="unavailable-page-link flex justify-center items-center w-10 h-10 text-xs cursor-not-allowed text-gray-500 rounded-lg">
              2
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;

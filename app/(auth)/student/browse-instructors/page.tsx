import CustomPagination from "@/components/UI/CustomPagination";
import { instructors } from "@/constants/instructors.data";
import InstructorCard from "./components/InstructorCard";

const BrowseCompaniesPage = async () => {
  const total = instructors.length;
  return (
    <>
      <p className="text-muted-foreground mt-2 text-sm">Showing {total} results</p>

      {/* Companies List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {instructors.map((instructor) => (
          <InstructorCard key={instructor.id} Instructor={instructor} />
        ))}
      </div>
      {/* Pagination */}
      <CustomPagination totalItems={total} initialNumberPerPage={12} />
    </>
  );
};

export default BrowseCompaniesPage;

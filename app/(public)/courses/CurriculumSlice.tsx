import Accordion from "@/components/UI/Accordion";
import { curriculums } from "@/types/courses";
type Curriculum = {
  accordionData: curriculums[];
};
const CurriculumSlice: React.FC<Curriculum> = ({ accordionData }) => {
  return (
    <div className="box-content !p-6">
      <div className="mb-4">
        <Accordion items={accordionData} />
      </div>
    </div>
  );
};
export default CurriculumSlice;

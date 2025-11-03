import { CurriculumItem } from "@/types/courses";
import { FileText, Lock, Play } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/UI/button";

const SectionItem = ({ item }: { item: CurriculumItem }) => {
  if (item.curriculumType === "quiz") {
    return (
      <div className="flex items-center gap-3">
        <Button
          size="icon"
          variant="ghost"
          disabled={true}
          className="bg-orange-100 text-orange-500"
        >
          <FileText />
        </Button>
        <span className="text-sm">{item.lecture?.title}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button
          size="icon"
          variant="ghost"
          disabled={!item.lecture?.isLectureFree}
          className="bg-primary/10 text-primary"
        >
          {item?.lecture?.isLectureFree ? <Play /> : <Lock />}
        </Button>
        <span className="text-sm">{item.lecture?.title}</span>
      </div>
      {item.lecture?.isLectureFree && (
        <Button
          asChild
          size="sm"
          variant="ghost"
          className="bg-primary/10 text-primary"
        >
          <Link href={"#"}>
            <Play size={14} />
            Preview
          </Link>
        </Button>
      )}
    </div>
  );
};

export default SectionItem;

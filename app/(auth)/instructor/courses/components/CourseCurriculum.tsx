import { CurriculumModule } from "@/types/courses";
import { ChevronDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/UI/Collapsible";

import SectionItem from "./SectionItem";

const CourseCurriculum: React.FC<{ sections: CurriculumModule[] }> = ({
  sections,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Course Curriculum</CardTitle>
        <CardDescription>
          {sections.length} Sections -{" "}
          {sections.reduce(
            (acc, section) =>
              acc +
              section.items.filter((item) => item.curriculumType == "lecture")
                .length,
            0,
          )}{" "}
          Lectures{", "}
          {sections.reduce(
            (acc, section) =>
              acc +
              section.items.filter((item) => item.curriculumType == "quiz")
                .length,
            0,
          )}{" "}
          Quizzes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {sections.map((section, index) => (
          <Collapsible key={index}>
            <CollapsibleTrigger asChild>
              <Button size="lg" className="h-auto w-full py-4">
                <div className="flex flex-1 gap-2">
                  <span className="font-semibold">{section.name}</span>
                </div>
                <span className="text-xs font-normal">
                  {
                    section.items?.filter(
                      (item) => item.curriculumType == "lecture",
                    ).length
                  }{" "}
                  Lectures
                </span>
                <ChevronDown />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-2 p-4">
                {section.items?.map((item) => (
                  <SectionItem key={item.id} item={item} />
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
};

export default CourseCurriculum;

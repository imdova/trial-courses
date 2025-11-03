import { CourseType, SingleCourseResponse, CourseMaterial } from "@/types/courses";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/UI/card";
import { Calendar, Eye, Download, FileText } from "lucide-react";
import { fileIcons } from "../../constant/fileIcons";
import { useMemo } from "react";

interface MaterialProps {
  Video: CourseType;
  courseData?: SingleCourseResponse | null;
  handleView: (id: string) => void;
  handleDownload: (url: string, name: string) => void;
}

const Material = ({
  Video,
  courseData,
  handleView,
  handleDownload,
}: MaterialProps) => {
  // Extract materials from course sections
  const extractedMaterials = useMemo((): CourseMaterial[] => {
    if (!courseData?.sections) return [];
    
    const materials: CourseMaterial[] = [];
    
    courseData.sections.forEach((section) => {
      section.items.forEach((item) => {
        // Check if it's a lecture with a materialUrl
        if (item.curriculumType === "lecture" && item.lecture?.materialUrl) {
          const lecture = item.lecture;
          
          // Extract file extension from URL
          const urlParts = lecture.materialUrl.split('.');
          const fileExtension = urlParts[urlParts.length - 1].split('?')[0]; // Remove query params
          
          materials.push({
            id: item.id,
            name: lecture.title || "Untitled Material",
            date: item.created_at,
            fileType: fileExtension.toUpperCase(),
            downloadUrl: lecture.materialUrl,
          });
        }
      });
    });
    
    return materials;
  }, [courseData]);

  // Use extracted materials if available, otherwise fall back to Video.materials
  const displayMaterials = extractedMaterials.length > 0 ? extractedMaterials : Video.materials;
  return (
    <div className="space-y-4">
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Study Materials</h1>
      <p className="text-sm text-gray-600">
        View or download course materials
      </p>
    </div>

    {displayMaterials && displayMaterials.length > 0 ? (
      <div className="grid grid-cols-1 gap-4 ">
        {displayMaterials.map((material) => (
          <Card key={material.id} className="group hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <div className="text-primary text-2xl">
                    {fileIcons[
                      material.fileType as keyof typeof fileIcons
                    ] || fileIcons.default}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base truncate">
                    {material.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <Calendar size={14} />
                    {new Date(material.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardFooter className="flex gap-2">
              <button
                onClick={() => handleView(material.id)}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                <Eye size={16} />
                View
              </button>
              <button
                onClick={() =>
                  handleDownload(material.downloadUrl, material.name)
                }
                className="flex-1 bg-primary flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
              >
                <Download size={16} />
                Download
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    ) : (
      <Card className="py-12">
        <CardContent className="text-center">
          <FileText size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">No materials found.</p>
        </CardContent>
      </Card>
    )}
  </div>
  )
}

export default Material
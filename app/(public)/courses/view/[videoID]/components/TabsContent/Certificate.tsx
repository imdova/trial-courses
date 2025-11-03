import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/UI/card";
import { Award, Calendar, Eye, Download } from "lucide-react";
import { CourseType } from "@/types/courses";

interface CertificateProps {
  Video: CourseType;
  handleView: (id: string) => void;
  handleDownload: (url: string, name: string) => void;
}
const Certificate = ({ Video, handleView, handleDownload }: CertificateProps) => {
  return (
    <div className="space-y-4">
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Earned Certificates
      </h1>
      <p className="text-sm text-gray-600">
        View or download your earned certificates
      </p>
    </div>

    {Video.certificates_list && Video.certificates_list.length > 0 ? (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Video.certificates_list.map((certificate) => (
          <Card key={certificate.id} className="group hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-lg">
                  <Award size={32} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg mb-2">
                    {certificate.name}
                  </CardTitle>
                  <CardDescription className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium text-gray-700">Program:</span>
                      <span className="truncate">{certificate.program}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium text-gray-700">Grade:</span>
                      <span className="bg-primary/10 text-primary px-2 py-0.5 rounded font-semibold">
                        {certificate.grade}
                      </span>
                    </div>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={14} />
                  <span>
                    {new Date(certificate.issue_date).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Serial: <span className="font-mono">{certificate.serial}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <button
                onClick={() => handleView(certificate.id)}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                <Eye size={16} />
                View
              </button>
              <button
                onClick={() =>
                  handleDownload(
                    certificate.downloadUrl,
                    certificate.name
                  )
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
          <Award size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500">No certificates found.</p>
        </CardContent>
      </Card>
    )}
  </div>
  )
}

export default Certificate
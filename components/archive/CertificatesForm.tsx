"use client";

import FormModal from "@/components/FormModal/FormModal";
import IconButton from "@/components/UI/Buttons/IconButton";
import { FieldConfig } from "@/types/forms";
import dayjs from "dayjs";
import { Award, Pen, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface Certificate {
  title: string;
  organization: string;
  issueDate: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  doesNotExpire?: boolean;
}

interface CertificatesFormProps {
  user: InstructorProfile;
  isMe: boolean;
}

const CertificatesForm: React.FC<CertificatesFormProps> = ({ user, isMe }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [certificates, setCertificates] = useState<Certificate[]>(
    user.certificates || []
  );
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const certificateFields: FieldConfig[] = [
    {
      name: "title",
      type: "text",
      label: "Title*",
      required: true,
      textFieldProps: {
        placeholder: "e.g. Board Certified Pharmacotherapy Specialist",
      },
      rules: {
        minLength: {
          value: 3,
          message: "Title must be at least 3 characters",
        },
      },
    },
    {
      name: "organization",
      type: "text",
      label: "Organization*",
      required: true,
      textFieldProps: {
        placeholder: "e.g. Board of Pharmacy Specialties",
      },
    },
    {
      name: "issueDate",
      type: "date",
      label: "Issue Date*",
      gridProps: { xs: 12, md: 6 },
      required: true,
      dateFieldProps: {
        maxDate: dayjs(),
      },
    },
    {
      name: "expirationDate",
      type: "date",
      label: "Expiration Date",
      gridProps: { xs: 12, md: 6 },

      dateFieldProps: {
        minDate: dayjs(),
      },
      dependsOn: "issueDate",
    },
    {
      name: "doesNotExpire",
      type: "checkbox",
      label: "This certificate is present",
      onChange: (value) => {
        if (value) {
          return {
            hideFieldNames: ["expirationDate"],
            resetFields: ["expirationDate"],
          };
        }
        return {
          unHideFieldNames: ["expirationDate"],
        };
      },
    },
  ];

  const handleAddOrUpdateCertificate = (certData: Certificate) => {
    if (editingIndex !== null) {
      // Update existing certificate
      const updated = [...certificates];
      updated[editingIndex] = certData;
      setCertificates(updated);
    } else {
      // Add new certificate
      setCertificates([...certificates, certData]);
    }
    setEditingIndex(null);
    setIsModalOpen(false);
  };

  const handleDeleteCertificate = (index: number) => {
    const updated = certificates.filter((_, i) => i !== index);
    setCertificates(updated);
  };

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format("MMM YYYY");
  };

  return (
    <div className="w-full">
      <div>
        {isMe && (
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Certificates</h3>
            <div className="flex gap-2">
              <IconButton
                className="!text-gray-500 border border-gray-200 !rounded-md hover:bg-gray-50"
                Icon={Plus}
                onClick={() => {
                  setEditingIndex(null);
                  setIsModalOpen(true);
                }}
              />
            </div>
          </div>
        )}

        {certificates.length > 0 ? (
          <div className="space-y-3">
            {certificates.map((cert, index) => (
              <div key={index} className="p-3 ">
                <div className="flex items-start gap-3">
                  <Award
                    size={20}
                    className="mt-0.5 flex-shrink-0 text-primary"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-sm">{cert.title}</h3>
                        <p className="text-xs text-gray-600">
                          {cert.organization}
                        </p>
                        <div className="text-xs text-gray-500 mt-1">
                          Issued: {formatDate(cert.issueDate)}
                          {cert.expirationDate && !cert.doesNotExpire && (
                            <span className="text-xs">
                              {" "}
                              • Expires: {formatDate(cert.expirationDate)}
                            </span>
                          )}
                          {cert.doesNotExpire && (
                            <span className="text-xs"> • Present</span>
                          )}
                        </div>
                      </div>
                      {isMe && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingIndex(index);
                              setIsModalOpen(true);
                            }}
                            className="text-primary hover:text-primary-dark"
                            aria-label="Edit certificate"
                          >
                            <Pen size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteCertificate(index)}
                            className="text-red-500 hover:text-red-700"
                            aria-label="Delete certificate"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : isMe ? (
          <div className="flex flex-col items-center justify-center py-8">
            <IconButton
              className="!text-gray-500 border border-gray-200 !rounded-md hover:bg-gray-50 mb-4"
              Icon={Plus}
              onClick={() => {
                setEditingIndex(null);
                setIsModalOpen(true);
              }}
            />
            <p className="text-gray-500  text-xs">No certificates added yet</p>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No certificates available
          </div>
        )}
      </div>

      <FormModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingIndex(null);
        }}
        onSubmit={handleAddOrUpdateCertificate}
        fields={certificateFields}
        title={
          editingIndex !== null ? "Edit Certificate" : "Add New Certificate"
        }
        initialValues={
          editingIndex !== null
            ? certificates[editingIndex]
            : {
                title: "",
                organization: "",
                issueDate: new Date().toISOString().split("T")[0],
                doesNotExpire: false,
              }
        }
      />
    </div>
  );
};

export default CertificatesForm;

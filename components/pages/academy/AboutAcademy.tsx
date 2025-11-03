"use client";

import React, { useState } from "react";

// Types
import { Company } from "@/types";

// UI Components
import EmptyCard from "@/components/UI/emptyCard";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/UI/Collapsible";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import { Plus } from "lucide-react";
import { Button } from "@/components/UI/button";

// Utils
import { FieldConfig } from "@/types/forms";
import FormModal from "@/components/FormModal/FormModal";
import { findCutIndex } from "@/util/forms";

/* -------------------------------------------------------------------------- */
/*                                CONFIGURATION                               */
/* -------------------------------------------------------------------------- */

const fields: FieldConfig[] = [
  {
    name: "about",
    type: "textEditor",
    componentProps: { hasLinks: false, className: "p-2" },
  },
];

// Preview limits
const PREVIEW_LIMIT = 400;
const MAX_LIMIT = 500;

/* -------------------------------------------------------------------------- */
/*                               HELPER COMPONENTS                            */
/* -------------------------------------------------------------------------- */

/**
 * Renders the "About" modal form.
 */
const AboutFormModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: Partial<Company>) => void;
  initialValue: string;
}> = ({ open, onClose, onSubmit, initialValue }) => (
  <FormModal
    open={open}
    onClose={onClose}
    onSubmit={onSubmit}
    fields={fields}
    title="About Company"
    description="Add a brief company description for potential employees. This section is public."
    initialValues={{ about: initialValue }}
  />
);

/**
 * Renders the About section content with collapsible preview.
 */
const AboutContent: React.FC<{ about: string; onEdit: () => void }> = ({
  about,
  onEdit,
}) => {
  const cutIndex = findCutIndex(about, PREVIEW_LIMIT);
  const isLong = about.length > MAX_LIMIT;
  const previewHTML = isLong ? about.slice(0, cutIndex) : about;
  const restHTML = isLong ? about.slice(cutIndex) : "";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bio :</CardTitle>
        <CardAction>
          <Button onClick={onEdit} size="icon" variant="outline">
            <Plus className="text-muted-foreground" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Collapsible>
          <div
            className="prose text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: previewHTML }}
          />
          {isLong && (
            <>
              <CollapsibleContent className="CollapsibleContent mx-1">
                <div
                  className="prose text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: restHTML }}
                />
              </CollapsibleContent>

              <CollapsibleTrigger className="group text-muted-foreground hover:text-main mt-2 w-full text-center text-sm">
                <span className="text-sm group-aria-expanded:hidden">
                  Show more
                </span>
                <span className="hidden text-sm group-aria-expanded:inline">
                  Show less
                </span>
              </CollapsibleTrigger>
            </>
          )}
        </Collapsible>
      </CardContent>
    </Card>
  );
};

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

const AboutAcademy: React.FC<{ instructor: InstructorData }> = ({
  instructor,
}) => {
  // const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const handleUpdate = async (formData: Partial<Company>) => {
    console.log("🚀 ~ handleUpdate ~ formData:", formData);
    // dispatch(updateCompany({ id: company.id, updates: formData }));
    setIsModalOpen(false);
  };

  const aboutEmpty =
    !instructor?.about ||
    instructor?.about.trim() === "" ||
    instructor?.about.trim() === "<p></p>";

  return (
    <>
      {/* About Form Modal */}
      <AboutFormModal
        open={isModalOpen}
        onClose={handleClose}
        onSubmit={handleUpdate}
        initialValue={instructor.about || ""}
      />

      {/* If empty show placeholder, else show content */}
      {aboutEmpty ? (
        <Card>
          <CardHeader>
            <CardTitle>About :</CardTitle>
            <CardAction>
              <Button onClick={handleOpen} size="icon" variant="outline">
                <Plus className="text-muted-foreground" />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-2">
            <EmptyCard
              src="/images/activities.png"
              description="Your About Section is empty."
              buttonText="Write About Your Academy"
              onClick={handleOpen}
            />
          </CardContent>
        </Card>
      ) : (
        <AboutContent about={instructor.about || ""} onEdit={handleOpen} />
      )}
    </>
  );
};

export default AboutAcademy;

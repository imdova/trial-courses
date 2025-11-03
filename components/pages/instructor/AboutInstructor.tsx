"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";

// Hooks
import { useProfile } from "@/hooks/useProfile";

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
    name: "bio",
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
  onSubmit: (formData: { bio?: string }) => void;
  initialValue: string;
}> = ({ open, onClose, onSubmit, initialValue }) => (
  <FormModal
    open={open}
    onClose={onClose}
    onSubmit={onSubmit}
    fields={fields}
    title="Bio"
    description="Write a brief public bio about yourself."
    initialValues={{ bio: initialValue }}
  />
);

/**
 * Renders the About section content with collapsible preview.
 */
const AboutContent: React.FC<{ bio: string; onEdit: () => void }> = ({
  bio,
  onEdit,
}) => {
  const cutIndex = findCutIndex(bio, PREVIEW_LIMIT);
  const isLong = bio.length > MAX_LIMIT;
  const previewHTML = isLong ? bio.slice(0, cutIndex) : bio;
  const restHTML = isLong ? bio.slice(cutIndex) : "";

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

const AboutInstructor = () => {
  // const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();
  const { profile, loading, updating, getProfile, saveProfile } = useProfile();

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const handleUpdate = async (formData: { bio?: string }) => {
    const bio = formData?.bio ?? "";
    try {
      if (session?.user?.id) {
        await saveProfile(session.user.id, { metadata: { bio } });
      }
    } finally {
      setIsModalOpen(false);
    }
  };

  const userId = session?.user?.id as string | undefined;

  useEffect(() => {
    if (userId) {
      getProfile(userId);
    }
  }, [userId, getProfile]);

  const bioText = useMemo(
    () => profile?.metadata?.bio ?? profile?.about ?? "",
    [profile]
  );

  const aboutEmpty =
    !bioText ||
    bioText.trim() === "" ||
    bioText.trim() === "<p></p>";

  return (
    <>
      {/* About Form Modal */}
      <AboutFormModal
        open={isModalOpen}
        onClose={handleClose}
        onSubmit={handleUpdate}
        initialValue={bioText || ""}
      />

      {/* If empty show placeholder, else show content */}
      {loading ? (
        <Card>
          <CardHeader>
            <CardTitle>Bio :</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground text-sm">Loading...</div>
          </CardContent>
        </Card>
      ) : aboutEmpty ? (
        <Card>
          <CardHeader>
            <CardTitle>Bio :</CardTitle>
            <CardAction>
              <Button onClick={handleOpen} size="icon" variant="outline" disabled={updating}>
                <Plus className="text-muted-foreground" />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-2">
            <EmptyCard
              src="/images/activities.png"
              description="Your About Section is empty."
              buttonText="Write About Your self"
              onClick={handleOpen}
            />
          </CardContent>
        </Card>
      ) : (
        <AboutContent bio={bioText || ""} onEdit={handleOpen} />
      )}
    </>
  );
};

export default AboutInstructor;

import { Pen, PlusIcon, Verified } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/UI/Tooltip";
import { Academy } from "@/types/academy";
import { AVATAR_IMAGE_PLACEHOLDER } from "@/constants";
import { Card } from "@/components/UI/card";
import React from "react";
import AcademyInfo from "../AcademyInfo";
import EditableAvatar from "@/components/UI/EditableAvatar";
import { useAcademy } from "@/hooks/useAcademy";
import { cn } from "@/util";
import { Button } from "@/components/UI/button";
import DropFileDialog from "@/components/UI/DropFileDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu";

const AcademyPrivateHeaderCard: React.FC<{ academy: Academy }> = ({
  academy,
}) => {
  const { updateAcademyHandler } = useAcademy();

  return (
    <Card
      className="overflow-hidden border-0 bg-cover bg-center p-0"
      style={{
        backgroundImage: academy.cover
          ? `url(${academy.cover})`
          : `url('/images/jobs-background.jpg')`,
      }}
    >
      <div
        className={cn(
          "shadow-soft from-secondary/60 to-primary/60 relative bg-linear-to-b",
        )}
      >
        <div className="flex h-fit min-h-[180px] w-full flex-col items-center gap-8 p-5 lg:flex-row">
          <EditableAvatar
            src={academy.image || AVATAR_IMAGE_PLACEHOLDER}
            className="bg-accent size-24"
            previewClassName="aspect-square mx-auto "
            onSuccess={(urls) => {
              updateAcademyHandler({ image: urls[0] });
            }}
            title="Update Image"
            description="Upload a new image for your academy"
            uploadButtonText="Upload Image"
            cancelButtonText="Cancel"
          />
          <div className="space-y-2">
            <h5 className="flex items-center text-2xl font-bold text-white">
              {academy.name}
              {academy.isVerified && (
                <Verified className="ml-2 inline-block h-5 w-5 fill-blue-500 stroke-blue-500 [&>path:nth-child(2)]:stroke-white" />
              )}
            </h5>
            <AcademyInfo academy={academy} />

            <div className="mt-4 flex -space-x-3">
              {academy.instructors?.slice(0, 3)?.map((instructor, idx) => (
                <Tooltip key={idx}>
                  <TooltipTrigger>
                    <Avatar className="ring-background size-8 ring-2 transition-all hover:z-10 hover:scale-150">
                      <AvatarImage src={instructor.photoUrl} />
                      <AvatarFallback className="text-muted-foreground text-xs">
                        {instructor.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{instructor.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="bg-muted has-focus-visible:ring-ring/50 ring-background flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full ring-2">
                    <PlusIcon className="size-4" />
                    <span className="sr-only">Add</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-2xs">
                  {academy.instructors?.slice(3).map((instructor, index) => (
                    <DropdownMenuItem key={index} className="cursor-auto" >
                      <Avatar>
                        <AvatarImage
                          src={instructor.photoUrl}
                          alt={instructor.name}
                        />
                        <AvatarFallback className="text-xs">
                          {instructor.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{instructor.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <DropFileDialog
            title="Update Cover"
            description="Upload a new cover image for your academy"
            previewClassName="aspect-video mx-auto"
            onSuccess={(urls) => {
              updateAcademyHandler({ cover: urls[0] });
            }}
          >
            <Button
              size="icon"
              className="absolute top-2 right-2 bg-transparent"
            >
              <Pen />
              <span className="sr-only">Edit</span>
            </Button>
          </DropFileDialog>
        </div>
      </div>
    </Card>
  );
};

export default AcademyPrivateHeaderCard;

import { ImageIcon, Verified } from "lucide-react";
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
// import ShareMenu from "@/components/UI/ShareMenu";
// import { Button } from "@/components/UI/button";

const AcademyHeaderCard: React.FC<{ academy: Academy }> = ({ academy }) => {
  return (
    <Card
      className="overflow-hidden border-0 bg-cover bg-center p-0"
      style={{
        backgroundImage: academy.cover
          ? `url(${academy.cover})`
          : `url('/images/jobs-background.jpg')`,
      }}
    >
      <div className="from-secondary/60 to-primary/60 shadow-soft relative bg-gradient-to-b">
        <div className="flex h-fit min-h-[180px] w-full flex-col items-center gap-8 p-5 lg:flex-row">
          <Avatar className="bg-accent size-24">
            <AvatarImage src={academy.image || AVATAR_IMAGE_PLACEHOLDER} />
            <AvatarFallback>
              <ImageIcon />
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h5 className="flex items-center text-2xl font-bold text-white">
              {academy.name}
              {academy.isVerified && (
                <Verified className="ml-2 inline-block h-5 w-5 fill-blue-500 stroke-blue-500 [&>path:nth-child(2)]:stroke-white" />
              )}
            </h5>
            <AcademyInfo academy={academy} />

            <div className="mt-4 flex -space-x-1">
              {academy.instructors?.slice(0, 4)?.map((instructor, idx) => (
                <Tooltip key={idx}>
                  <TooltipTrigger>
                    <Avatar className="size-8 transition-all hover:z-10 hover:scale-150">
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
            </div>
          </div>
        </div>
      </div>
      {/* <ShareMenu
        url={
          typeof window !== "undefined"
            ? window.location.href
            : "https://your.site"
        }
        title="Your Page"
        text="Check this out!"
      >
        <Button
          size="icon"
          variant="ghost"
          className="text-primary-foreground hover:text-primary-foreground rounded-full hover:bg-black/10"
        >
          <Share2 />
        </Button>
      </ShareMenu> */}
    </Card>
  );
};

export default AcademyHeaderCard;

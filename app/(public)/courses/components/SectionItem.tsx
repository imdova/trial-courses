import { CurriculumItem } from "@/types/courses";
import { FileText, Lock, Play } from "lucide-react";
import { Button } from "@/components/UI/button";
import { Badge } from "@/components/UI/badge";
import YouTubePlayer from "@/components/UI/youtube-video-player";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/dialog";

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
        <span className="text-sm">{item.quiz?.title}</span>
        <Badge variant="neutral">{item.quiz?.answer_time} m</Badge>
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
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className="bg-primary/10 text-primary"
            >
              <Play size={14} />
              Preview
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>{item.lecture?.title}</DialogTitle>
            </DialogHeader>

            <YouTubePlayer
              videoUrl={item.lecture.videoUrl}
              autoPlay
              priority
              className="aspect-video h-auto w-full"
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default SectionItem;

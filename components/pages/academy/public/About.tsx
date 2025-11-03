import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/UI/Collapsible";
import { Academy } from "@/types/academy";

const PREVIEW_LIMIT = 400;
const MAX_LIMIT = 500;

const findCutIndex = (html: string, limit: number) => {
  if (html.length <= limit) return html.length;
  let cutIndex = limit;

  // Move forward until a whitespace or end of string
  while (cutIndex < html.length && !/\s/.test(html[cutIndex])) {
    cutIndex++;
  }
  return cutIndex;
};

const AboutSection: React.FC<{ academy?: Academy }> = ({ academy }) => {
  const about = academy?.about || "";
  const cutIndex = findCutIndex(about, PREVIEW_LIMIT);
  const isLong = about.length > MAX_LIMIT;
  const previewHTML = isLong ? about.slice(0, cutIndex) : about;
  const restHTML = isLong ? about.slice(cutIndex) : "";

  return (
    <Card>
      <CardHeader>
        <CardTitle>About Academy:</CardTitle>
      </CardHeader>
      {/* Collapsible text */}
      <CardContent>
        {about ? (
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
        ) : (
          <p className="text-muted-foreground w-full text-center text-sm">
            No about information
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default AboutSection;

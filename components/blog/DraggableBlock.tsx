import { Block } from "@/types/blog";
import { BlockRenderer } from "./BlockRenderer";
import { useRef } from "react";
import { useDrag } from "react-dnd";
import { useAutoScrollOnDrag } from "@/hooks/useAutoScrollOnDrag";
import { Pen } from "lucide-react";
import { useBlogStore } from "@/lib/blog/blog-store";

interface DraggableBlockProps {
  block: Block;
  path: string;
}

export function DraggableBlock({ block, path }: DraggableBlockProps) {
  const { selectedBlockId, selectBlock } = useBlogStore();

  const isSelected = selectedBlockId === block.id;

  const dragRef = useRef<HTMLDivElement>(
    null,
  ) as React.RefObject<HTMLDivElement>;

  const [{ isDragging }, drag] = useDrag({
    type: block.type,
    item: {
      ...block,
      path,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(dragRef);

  useAutoScrollOnDrag({
    isDragging,
    className: ".scrollable-container",
  });

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        selectBlock(block.id);
      }}
      ref={dragRef}
      style={{ opacity }}
      className={`DRAG_BLOCK group relative h-full max-w-full border ${
        isSelected
          ? "border-primary border-2"
          : "hover:border-secondary border-transparent p-[1px]"
      }`}
    >
      <div className="bg-primary absolute top-0 right-0 z-10 hidden h-6 w-6 cursor-pointer rounded-bl-md p-1 group-hover:block">
        <Pen className="text-primary-foreground h-4 w-4" />
      </div>
      <BlockRenderer block={block} path={path} />
    </div>
  );
}

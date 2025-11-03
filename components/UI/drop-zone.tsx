import React, { CSSProperties } from "react";
import { useDrop } from "react-dnd";
import { cn } from "@/util";

type DropZoneData = {
  path: number;
};

type DropZoneProps = {
  data: DropZoneData;
  onDrop: (data: DropZoneData, item: DropZoneData) => void;
  className?: string;
  accepts: string[];
  styles?: CSSProperties;
};

const DropZone: React.FC<DropZoneProps> = ({
  data,
  onDrop,
  className,
  accepts,
  styles,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop<
    DropZoneData,
    void,
    { isOver: boolean; canDrop: boolean }
  >({
    accept: accepts,
    drop: (item) => {
      onDrop(data, item);
    },
    canDrop: (item) => {
      const dropZonePath = data.path;
      const itemPath = item.path;
      if (itemPath === undefined) return true;
      if (itemPath === dropZonePath) return false;
      if (itemPath + 1 === dropZonePath) return false;
      return true;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;

  return (
    <div
      style={styles}
      className={cn(
        "h-3 flex-grow-0 rounded-xl",
        isActive && "bg-secondary h-6 duration-150",
        className,
      )}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={drop as any}
    ></div>
  );
};

export default DropZone;

import { useRef } from "react";
import { useDrag } from "react-dnd";

export function useDraggable(index: number, DRAG_TYPE: string) {
  const dragRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: DRAG_TYPE,
      item: { path: index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [index, DRAG_TYPE],
  );

  // connect refs
  drag(dragRef);
  preview(previewRef);

  // handle style
  const opacity = isDragging ? 0.1 : 1;

  return {
    dragRef,
    previewRef,
    isDragging,
    opacity,
  };
}

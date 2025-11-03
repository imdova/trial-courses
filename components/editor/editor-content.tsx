"use client";

import { cn } from "@/util";
import { EditorContent, type Editor } from "@tiptap/react";

interface EditorContentProps {
  editor: Editor;
  className?: string;
}

export function EditorContentWrapper({
  editor,
  className,
}: EditorContentProps) {
  const childClass = ` 
  [&_*]:break-all
  [&_li]:ml-5 [&_li]:list-disc
  [&_p]:mx-[5px] [&_p]:my-0
  [&_a]:text-primary [&_a]:underline [&_a]:hover:no-underline [&_a]:cursor-pointer 
  [&_ul]:mx-[5px] [&_ul]:my-0
  [&_.ProseMirror]:-ms-overflow-style-none
  [&_.ProseMirror]:[scrollbar-width:none]
  [&_.ProseMirror::-webkit-scrollbar]:hidden`;
  return (
    <EditorContent
      editor={editor}
      placeholder="<p>Start writing...<p/>"
      className={cn(
        "prose prose-sm px-2 focus:outline-none",
        "[&_.ProseMirror]:min-h-[200px] [&_.ProseMirror]:outline-none [&_.ProseMirror]:focus:outline-none",
        childClass,
        className,
      )}
    />
  );
}

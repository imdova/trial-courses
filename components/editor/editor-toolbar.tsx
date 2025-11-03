"use client";

import type { Editor } from "@tiptap/react";
import { ToolbarButton } from "./toolbar-button";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Link,
  List,
  RotateCcw,
  Underline,
} from "lucide-react";
import { Separator } from "../UI/separator";
import { cn } from "@/util";

interface EditorToolbarProps {
  editor: Editor;
  className?: string;
  hasLinks?: boolean;
}

export function EditorToolbar({
  editor,
  className,
  hasLinks = true,
}: EditorToolbarProps) {
  return (
    <div className={cn("flex gap-1 border-b p-2", className)}>
      <ToolbarButton
        icon={Bold}
        label="Bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
      />
      <ToolbarButton
        icon={Italic}
        label="Italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
      />
      <ToolbarButton
        icon={Underline}
        label="Underline"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
      />
      <Separator orientation="vertical" className="min-h-5" />
      <ToolbarButton
        icon={List}
        label="Bullet List"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
      />
      <Separator orientation="vertical" className="min-h-5" />
      <ToolbarButton
        icon={AlignLeft}
        label="Align Left"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        isActive={editor.isActive({ textAlign: "left" })}
      />
      <ToolbarButton
        icon={AlignCenter}
        label="Align Center"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        isActive={editor.isActive({ textAlign: "center" })}
      />
      <ToolbarButton
        icon={AlignRight}
        label="Align Right"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        isActive={editor.isActive({ textAlign: "right" })}
      />
      {hasLinks && (
        <ToolbarButton
          icon={Link}
          label="Add Link"
          onClick={() => {
            const url = window.prompt("Enter URL");
            if (url) {
              editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: url })
                .run();
            }
          }}
          isActive={editor.isActive("link")}
        />
      )}
      <div className="flex-1" />
      <ToolbarButton
        icon={RotateCcw}
        label="Clear Formatting"
        onClick={() =>
          editor.chain().focus().clearNodes().unsetAllMarks().run()
        }
      />
    </div>
  );
}

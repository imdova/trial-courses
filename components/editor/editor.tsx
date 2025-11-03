"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { extensions } from "./extensions";
import { EditorToolbar } from "./editor-toolbar";
import { EditorContentWrapper } from "./editor-content";
import { CSSProperties, useEffect } from "react";
import { cn } from "@/util";
// import { FormControl } from "../UI/form";
import { Box } from "@mui/material";
import { FormControl } from "../UI/form";

interface TextEditorProps {
  className?: string;
  wrapperClassName?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  hasLinks?: boolean;
  withFormControl?: boolean;
}

export const BlockTextEditor: React.FC<{
  value: string;
  onChange: (e: string) => void;
  style?: CSSProperties | null;
}> = ({ value, onChange, style }) => {
  const editor = useEditor({
    extensions,
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Debug log
  console.log("BlockTextEditor render", { value, editor });

  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value as string);
    }
  }, [value, editor]);

  if (!editor) {
    console.log("BlockTextEditor: editor is null");
    return null;
  }

  return (
    <div className="w-full">
      <Box
        sx={{
          "& *": {
            ...style,
          },
          "& .ProseMirror ": {
            border: "none",
            p: 0,
            minHeight: "unset",
          },
          "& .ProseMirror:focus": {
            border: "none",
          },
          "& a, a *": {
            color: "blue !important",
            textDecoration: "underline !important",
            cursor: "pointer !important",
            "&:hover": {
              textDecoration: "none !important",
            },
          },
        }}
      >
        <EditorContent
          editor={editor}
          className="prose prose-sm w-full focus:border-none focus:outline-none"
        />
      </Box>
    </div>
  );
};

function TextEditor({
  className,
  wrapperClassName,
  value,
  onChange,
  hasLinks,
  withFormControl = false,
}: TextEditorProps) {
  const editor = useEditor({
    extensions,
    content: value as string | undefined,
    onUpdate: ({ editor }) => {
      if (onChange) {
        const syntheticEvent = {
          target: { value: editor.getHTML() },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
    },
  });

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value as string);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }
  const EditorUI = (
    <div
      className={cn(
        "border-input rounded-base w-full border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm",
        "focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
    >
      <EditorToolbar hasLinks={hasLinks} editor={editor} />
      <EditorContentWrapper editor={editor} className={wrapperClassName} />
    </div>
  );

  return withFormControl ? <FormControl>{EditorUI}</FormControl> : EditorUI;
}
export default TextEditor;

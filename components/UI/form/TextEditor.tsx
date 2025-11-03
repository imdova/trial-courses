import { Bold, Italic, List, Underline } from "lucide-react";
import { useState, useRef, useEffect, forwardRef } from "react";

type TextEditorProps = {
  initialContent?: string;
  placeholder?: string;
  onContentChange?: (content: string) => void;
  value?: string;
  defaultValue?: string; // Add defaultValue for uncontrolled usage
  onChange?: (value: string) => void;
  name?: string;
};

const TextEditor = forwardRef<HTMLDivElement, TextEditorProps>(
  (
    {
      initialContent = "",
      placeholder = "Add a detailed description of your course...",
      onContentChange,
      value,
      defaultValue,
      onChange,
      name,
    },
    ref
  ) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [activeFormats, setActiveFormats] = useState({
      bold: false,
      italic: false,
      underline: false,
      list: false,
    });
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(
      defaultValue || initialContent
    );
    const [showPlaceholder, setShowPlaceholder] = useState(
      !(defaultValue || initialContent)
    );

    // Combine the forwarded ref with our local ref
    const combinedRef = (node: HTMLDivElement) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
      editorRef.current = node;
    };

    // Sync content with external changes
    useEffect(() => {
      if (!editorRef.current) return;

      const currentValue = isControlled ? value : internalValue;
      editorRef.current.innerHTML = currentValue || "";
      setShowPlaceholder(!currentValue);
    }, [value, internalValue, isControlled]);

    const handleInput = () => {
      if (!editorRef.current) return;

      const newContent = editorRef.current.innerHTML;

      // Check if content is empty
      setShowPlaceholder(!newContent);

      // Check active formats
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        if (!range.collapsed) {
          const parentElement = range.commonAncestorContainer.parentElement;
          setActiveFormats({
            bold: document.queryCommandState("bold"),
            italic: document.queryCommandState("italic"),
            underline: document.queryCommandState("underline"),
            list: parentElement?.tagName === "LI" || false,
          });
        }
      }

      // Update state based on controlled/uncontrolled mode
      if (!isControlled) {
        setInternalValue(newContent);
      }

      // Notify parent components
      if (onContentChange) onContentChange(newContent);
      if (onChange) onChange(newContent);
    };

    const toggleFormat = (format: "bold" | "italic" | "underline") => {
      if (!editorRef.current) return;
      document.execCommand(format, false);
      editorRef.current.focus();
      handleInput();
    };

    const toggleList = () => {
      if (!editorRef.current) return;
      document.execCommand("insertUnorderedList", false);
      editorRef.current.focus();
      handleInput();
    };

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
      const text = e.clipboardData.getData("text/plain");
      document.execCommand("insertText", false, text);
      handleInput();
    };

    const handleFocus = () => {
      if (showPlaceholder && editorRef.current) {
        editorRef.current.innerHTML = "";
        setShowPlaceholder(false);
      }
    };

    const handleBlur = () => {
      if (editorRef.current && !editorRef.current.innerHTML) {
        setShowPlaceholder(true);
      }
    };

    return (
      <div className="border rounded-lg overflow-hidden">
        {/* Hidden input for form submission */}
        <input
          type="hidden"
          name={name}
          value={isControlled ? value : internalValue}
        />

        {/* Toolbar */}
        <div className="flex items-center gap-1 p-2 border-b border-gray-300 bg-gray-50">
          <button
            type="button"
            onClick={() => toggleFormat("bold")}
            className={`p-2 rounded ${
              activeFormats.bold
                ? "bg-green-100 text-green-600"
                : "hover:bg-gray-100"
            }`}
            aria-label="Bold"
            title="Bold (Ctrl+B)">
            <Bold size={16} strokeWidth={activeFormats.bold ? 2.5 : 2} />
          </button>
          <button
            type="button"
            onClick={() => toggleFormat("italic")}
            className={`p-2 rounded ${
              activeFormats.italic
                ? "bg-green-100 text-green-600"
                : "hover:bg-gray-100"
            }`}
            aria-label="Italic"
            title="Italic (Ctrl+I)">
            <Italic size={16} strokeWidth={activeFormats.italic ? 2.5 : 2} />
          </button>
          <button
            type="button"
            onClick={() => toggleFormat("underline")}
            className={`p-2 rounded ${
              activeFormats.underline
                ? "bg-green-100 text-green-600"
                : "hover:bg-gray-100"
            }`}
            aria-label="Underline"
            title="Underline (Ctrl+U)">
            <Underline
              size={16}
              strokeWidth={activeFormats.underline ? 2.5 : 2}
            />
          </button>
          <button
            type="button"
            onClick={toggleList}
            className={`p-2 rounded ${
              activeFormats.list
                ? "bg-green-100 text-green-600"
                : "hover:bg-gray-100"
            }`}
            aria-label="List"
            title="Bullet List">
            <List size={16} strokeWidth={activeFormats.list ? 2.5 : 2} />
          </button>
        </div>

        {/* Editor */}
        <div className="relative">
          <div
            ref={combinedRef}
            className="min-h-[200px] p-4 focus:outline-none prose max-w-none"
            contentEditable
            onInput={handleInput}
            onPaste={handlePaste}
            onMouseUp={handleInput}
            onKeyUp={handleInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            suppressContentEditableWarning
          />
          {showPlaceholder && (
            <div className="absolute top-0 left-0 p-4 text-gray-400 pointer-events-none">
              {placeholder}
            </div>
          )}
        </div>
      </div>
    );
  }
);

TextEditor.displayName = "TextEditor";

export default TextEditor;

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export interface MjmlEditorHandles {
  getMjmlValue: () => string;
}

interface MjmlEditorProps {
    mjmlUrl: string;
    id?: string;
    onChange: (value: string) => void;
}

export const MjmlEditor = forwardRef<MjmlEditorHandles, MjmlEditorProps>(
  ({ onChange, mjmlUrl }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [mjmlvalue, setMJMLvalue] = useState("");

    useImperativeHandle(ref, () => ({
      getMjmlValue: () => mjmlvalue,
    }));

    useEffect(() => {
      fetchMjmlContent();

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === "Tab" && document.activeElement === textareaRef.current) {
          e.preventDefault();
          const textarea = textareaRef.current;
          if (!textarea) return;

          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const newValue =
            textarea.value.substring(0, start) + "  " + textarea.value.substring(end);

          setMJMLvalue(newValue);
          onChange(newValue);
          textarea.selectionStart = textarea.selectionEnd = start + 2;
        }
      };

      document.addEventListener("keydown", handleTabKey);
      return () => {
        document.removeEventListener("keydown", handleTabKey);
      };
    }, [mjmlUrl]);

    const fetchMjmlContent = async () => {
      try {
        const pathOnly = new URL(mjmlUrl).pathname;
        const response = await fetch(pathOnly);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const mjmlText = await response.text();
        const cleanedMJML = mjmlText
          .replace(/\\(["/n])/g, (m, p1) => (p1 === "n" ? "\n" : p1))
          .trim()
          .replace(/^"|"$/g, "");

        setMJMLvalue(cleanedMJML);
        onChange(cleanedMJML);
      } catch (error) {
        console.error("Failed to fetch MJML content:", error);
      }
    };

    return (
      <div className="h-full w-full bg-editor p-4">
        <Textarea
          ref={textareaRef}
          value={mjmlvalue}
          onChange={(e) => {
            setMJMLvalue(e.target.value);
            onChange(e.target.value);
          }}
          className="h-full w-full font-mono text-sm bg-white border border-editor-border p-4 resize-none focus-visible:ring-1"
          placeholder="Type your MJML code here..."
          spellCheck={false}
        />
      </div>
    );
  }
);

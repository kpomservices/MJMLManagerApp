
import { useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";

interface CodeEditorProps {
  value: string;
  id?: string; // 👈 Accept id as prop
  onChange: (value: string) => void;
}

export function CodeEditor({ value, onChange, id }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && document.activeElement === textareaRef.current) {
        e.preventDefault();
        
        const textarea = textareaRef.current;
        if (!textarea) return;
        
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        
        const newValue = textarea.value.substring(0, start) + '  ' + textarea.value.substring(end);
        
        textarea.value = newValue;
        textarea.selectionStart = textarea.selectionEnd = start + 2;
        
        onChange(newValue);
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [onChange]);

  return (
    <div className="h-full w-full bg-editor p-4">
      <iframe
        src={`https://email.diybuilder.in/index.php?tempname=${id}`}
        title="MJML Editor"
        className="h-full w-full bg-white border border-editor-border"
      >
      </iframe>
      {/* <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-full w-full font-mono text-sm bg-white border border-editor-border p-4 resize-none focus-visible:ring-1"
        placeholder="Type your MJML code here..."
        spellCheck={false}
      /> */}
    </div>
  );
}

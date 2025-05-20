
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, ArrowLeft, Eye, Code } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EditorToolbarProps {
  title: string;
  onTitleChange: (value: string) => void;
  onSave: () => void;
  onTogglePreview: () => void;
  isPreviewMode: boolean;
  isSaving: boolean;
}

export function EditorToolbar({ 
  title, 
  onTitleChange, 
  onSave, 
  onTogglePreview, 
  isPreviewMode,
  isSaving 
}: EditorToolbarProps) {
  const navigate = useNavigate();

  return (
    <div className="h-14 border-b flex items-center justify-between px-4 bg-white">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-64 h-8"
          placeholder="Template name"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onTogglePreview}
        >
          {isPreviewMode ? (
            <>
              <Code className="mr-2 h-4 w-4" />
              Code
            </>
          ) : (
            <>
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </>
          )}
        </Button>
        <Button 
          onClick={onSave}
          disabled={isSaving}
          size="sm"
        >
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}

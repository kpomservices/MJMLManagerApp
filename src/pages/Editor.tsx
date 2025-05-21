
import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { EditorToolbar } from "@/components/EditorToolbar";
//import { CodeEditor } from "@/components/CodeEditor";
import { MjmlEditor } from "@/components/MjmlEditor";
import { MjmlPreview } from "@/components/MjmlPreview";
import { 
  getTemplate, 
  saveTemplate, 
  createNewTemplate, 
  Template 
} from "@/lib/templates";
import { useToast } from "@/hooks/use-toast";
import type { MjmlEditorHandles } from "@/components/MjmlEditor";

const Editor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [template, setTemplate] = useState<Template>(createNewTemplate());
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const editorRef = useRef<MjmlEditorHandles>(null);
  

    useEffect(() => {
      const loadTemplate = async () => {
        if (id && id !== 'new') {
          const existingTemplate = await getTemplate(id);
          if (existingTemplate) {
            setTemplate(existingTemplate);
          } else {
            toast({
              title: "Template not found",
              description: "The template you're looking for doesn't exist.",
              variant: "destructive",
            });
            navigate('/');
          }
        }
      };
  
    loadTemplate();
  }, [id, navigate, toast]);
  
  
  const handleContentChange = (newContent: string) => {
    setTemplate(prev => ({ ...prev, content: newContent }));
  };
  
  const handleTitleChange = (newTitle: string) => {
    setTemplate(prev => ({ ...prev, title: newTitle }));
  };
  
  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate a network delay
    setTimeout(() => {
      try {
        const savedTemplate = saveTemplate(template);
        setTemplate(savedTemplate);
        
        toast({
          title: "Template saved",
          description: "Your changes have been saved successfully.",
        });
        
        // Redirect to the proper URL if this was a new template
        if (!id || id === 'new') {
          navigate(`/editor/${savedTemplate.id}`, { replace: true });
        }
      } catch (error) {
        toast({
          title: "Error saving template",
          description: "There was a problem saving your template.",
          variant: "destructive",
        });
      } finally {
        setIsSaving(false);
      }
    }, 800);
  };
  
  const togglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const handleDownload = () => {
    const mjml = editorRef.current?.getMjmlValue() || "";
    const blob = new Blob([mjml], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = `${template.title || "mjml-template"}.txt`;
    document.body.appendChild(a);
    a.click();
  
    setTimeout(() => {
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 1500);
  };
  

  
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col h-screen">
        <EditorToolbar
          title={template.title}
          onTitleChange={handleTitleChange}
          onSave={handleSave}
          onDownload={handleDownload}
          onTogglePreview={togglePreview}
          isPreviewMode={isPreviewMode}
          isSaving={isSaving}
        />
        
        <div className="flex-1 flex overflow-hidden">
         

          {isPreviewMode ? (
            <div className="flex h-full w-full">
              {/* Left: MJML Code Editor */}
              <div className="w-1/2 h-full border-r">
                <MjmlEditor ref={editorRef} mjmlUrl={template.mjmlUrl} id={id} onChange={handleContentChange} />
              </div>

              {/* Right: Rendered HTML Preview */}
              <div className="w-1/2 h-full">
                <MjmlPreview mjmlCode={template.content} />
              </div>
            </div>
          ) : (
            <div className="h-full border-r" style={{ width: "100%" }}>
              <div className="h-full w-full bg-editor p-4">
                <iframe
                  src={`https://email.diybuilder.in/index.php?tempname=${id}`}
                  title="MJML Editor"
                  className="h-full w-full bg-white border border-editor-border"
                >
                </iframe>
              </div>
              {/* <CodeEditor value={template.content} id={id} onChange={handleContentChange} /> */}
            </div>
          )}


      
        </div>
      </div>
    </div>
  );
};

export default Editor;

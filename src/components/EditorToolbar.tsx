
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, ArrowLeft, Eye, Code, Download,Smartphone, Monitor  } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface EditorToolbarProps {
  title: string;
  onTitleChange: (value: string) => void;
  onSave: () => void;
  onDownload: () => void;
  onTogglePreview: () => void;
  isPreviewMode: boolean;
  isSaving: boolean;
  iframeRef: React.RefObject<HTMLIFrameElement>;
}

export function EditorToolbar({ 
  title, 
  onTitleChange, 
  onSave,
  onDownload, 
  onTogglePreview, 
  isPreviewMode,
  isSaving,
  iframeRef 
}: EditorToolbarProps) {
  const navigate = useNavigate();

  // const iframeDownloadFunction = () => {
  //   iframeRef.current?.contentWindow?.postMessage({ type: "DOWNLOAD_MJML" }, "*");
  // };

  // const iframeSaveFunction = () => {
  //   iframeRef.current?.contentWindow?.postMessage({ type: "SAVE_MJML" }, "*");
  // };

  const location = useLocation();
  const isEditor = location.pathname.includes("/editor");

  const callIframefunctions = (functionName: string) => {

    iframeRef.current?.contentWindow?.postMessage({ type: functionName }, "*");
    if(functionName === 'PREVIEW_MJML') {
      setTimeout(() => {
        onTogglePreview();
      }, 3000); // delay in milliseconds, e.g., 1000ms = 1 second
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

const onImportClick = () => {
  fileInputRef.current?.click();
};


const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const mjmlContent = reader.result as string;
    iframeRef.current?.contentWindow?.postMessage(
      { type: "IMPORT_MJML", content: mjmlContent }, 
      "*"
    );
  };
  reader.readAsText(file);
};



  return (
    <div className="h-14 border-b flex items-center justify-between px-4 bg-white">
      
      <div className="flex items-center gap-2">
      {!isEditor && <SidebarTrigger />}
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
          onClick={() => callIframefunctions("PREVIEW_MJML")}
          // onClick={onTogglePreview}
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
        {!isPreviewMode && (
        <Button 
          // onClick={onSave}
          onClick={() => callIframefunctions("SAVE_MJML")}
          disabled={isSaving}
          size="sm"
          
        >
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Saving..." : "Save"}
        </Button>
        )}
        {/* {isPreviewMode && onDownload && ( */}
        <Button 
          onClick={onImportClick}
          variant="outline" 
          size="sm"
        >
          <Download className="mr-2 h-4 w-4" />
          <>
              Import MJML
            </>
        </Button>
        <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={onFileChange} />
        <Button 
          onClick={() => callIframefunctions("DOWNLOAD_MJML")}
          variant="outline" 
          size="sm"
        >
          <Download className="mr-2 h-4 w-4" />
          <>
              Download
            </>
        </Button>
        {!isPreviewMode && (
        <Button 
          onClick={() => callIframefunctions("LOGIN_PAGE")}
          variant="outline" 
          size="sm"
        >
          <Download className="mr-2 h-4 w-4" />
          <>
              Login
            </>
        </Button>
        )}
        {isPreviewMode && (
          <>
            <Button 
              variant="outline" 
              size="sm"
            >
              <Smartphone className="mr-2 h-4 w-4" />
              Mobile
            </Button>

            <Button 
              variant="outline" 
              size="sm"
            >
              <Monitor className="mr-2 h-4 w-4" />
              Desktop
            </Button>
          </>
        )}

      </div>
    </div>
  );
}

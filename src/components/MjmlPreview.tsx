
import { useEffect, useState } from "react";
import mjml2html from "mjml-browser";

interface MjmlPreviewProps {
  mjmlCode: string;
}

export function MjmlPreview({ mjmlCode }: MjmlPreviewProps) {
  const [htmlOutput, setHtmlOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  // React useEffect
  useEffect(() => {
    const formData = new FormData();
    formData.append("mjml", mjmlCode);
    const mjmlbaseUrl = import.meta.env.VITE_MJML_API_URL;
    fetch(`${mjmlbaseUrl}/mjml2htmlupdated.php`, {
      method: "POST",
      body: formData,
    })
      .then(res => res.text())
      .then(html => {
        setHtmlOutput(html);
        setError(null);
      })
      .catch(e => {
        setError("Failed to compile MJML: " + e.message);
        setHtmlOutput("");
      });
  }, [mjmlCode]);


  if (error) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-red-50 p-4">
        <div className="text-red-500 text-center">
          <h3 className="font-bold">Error rendering MJML</h3>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!htmlOutput) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gray-50">
        <p className="text-gray-400">Preview will appear here</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-white overflow-auto">
      <iframe
        srcDoc={htmlOutput}
        title="MJML Preview"
        className="w-full h-full border-0"
        sandbox="allow-same-origin"
      />
    </div>
  );
}

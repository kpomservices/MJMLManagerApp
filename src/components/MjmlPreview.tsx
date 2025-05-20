
import { useEffect, useState } from "react";
import mjml2html from "mjml-browser";

interface MjmlPreviewProps {
  mjmlCode: string;
}

export function MjmlPreview({ mjmlCode }: MjmlPreviewProps) {
  const [htmlOutput, setHtmlOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Only process if we have MJML code
      if (mjmlCode.trim()) {
        const { html, errors } = mjml2html(mjmlCode);
        setHtmlOutput(html);
        setError(errors.length > 0 ? errors[0].message : null);
      } else {
        setHtmlOutput("");
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to render MJML");
      setHtmlOutput("");
    }
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

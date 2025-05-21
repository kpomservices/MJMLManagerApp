
import { useEffect, useState } from "react";
import mjml2html from "mjml-browser";

interface MjmlPreviewProps {
  mjmlCode: string;
}

export function MjmlPreview({ mjmlCode }: MjmlPreviewProps) {
  const [htmlOutput, setHtmlOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  //console.log(mjmlCode)

  // useEffect(() => {
  //   try {
  //     // Only process if we have MJML code
  //     if (mjmlCode.trim()) {
  //       const { html, errors } = mjml2html(mjmlCode);
  //       setHtmlOutput(html);
  //       setError(errors.length > 0 ? errors[0].message : null);
  //     } else {
  //       setHtmlOutput("");
  //       setError(null);
  //     }
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : "Failed to render MJML");
  //     setHtmlOutput("");
  //   }
  // }, [mjmlCode]);


  // React useEffect
useEffect(() => {
  if (!mjmlCode.trim()) {
    setHtmlOutput("");
    setError(null);
    return;
  }
  const formData = new FormData();
  formData.append("mjml", mjmlCode);

  fetch("https://diybuilder.in/mjml-builder/mjml2htmlupdated.php", {
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

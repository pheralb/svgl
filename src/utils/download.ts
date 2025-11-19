type MimeType = "image/svg+xml" | "application/zip";

interface Download {
  content: string | Blob;
  filename: string;
  mimeType: MimeType;
}

export const download = ({ content, filename, mimeType }: Download) => {
  const blob =
    typeof content === "string"
      ? new Blob([content], { type: mimeType })
      : content;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

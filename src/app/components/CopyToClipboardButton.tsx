import clsx from "clsx";
import { useState } from "react";
import { toast } from "react-toastify";

interface CopyToClipboardButtonProps {
  imageBlob: Blob | null;
}

const CopyToClipboardButton = ({ imageBlob }: CopyToClipboardButtonProps) => {
  const [copying, setCopying] = useState(false);

  const handleCopy = async () => {
    if (!imageBlob) return; // Do nothing if there is no image blob

    setCopying(true);
    try {
      if (!navigator.clipboard || !ClipboardItem) {
        console.error("Clipboard API or ClipboardItem is not available");
        toast.error(
          "Clipboard functionality is not available in this browser."
        );
        return;
      }

      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": imageBlob }),
      ]);
      toast.success("Image copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy image:", error);
      toast.error("Failed to copy image.");
    } finally {
      setCopying(false);
    }
  };

  return (
    <button
      className={clsx("btn", imageBlob ? "btn-primary" : "btn-ghost")}
      onClick={handleCopy}
      disabled={!imageBlob || copying}
    >
      {copying ? (
        <span className="loading loading-sm loading-spinner"></span>
      ) : (
        "Copy Image"
      )}
    </button>
  );
};

export default CopyToClipboardButton;

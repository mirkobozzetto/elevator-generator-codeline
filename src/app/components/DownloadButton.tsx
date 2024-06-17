import { DownloadButtonProps } from "@/types/types";
import { renderPNG } from "@/utils/renderPNG";

const DownloadButton = ({ image, settings }: DownloadButtonProps) => {
  const handleDownload = async () => {
    const pngData: { png: Blob } = (await renderPNG({ image, settings })) as {
      png: Blob;
    };

    if (pngData) {
      const url = URL.createObjectURL(
        new Blob([pngData.png], { type: "image/png" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = `${image.name}.png`;
      link.click();
    }
  };

  return (
    <button
      className="mt-4 btn btn-primary"
      onClick={handleDownload}
      disabled={!image}
    >
      Download Image
    </button>
  );
};

export default DownloadButton;

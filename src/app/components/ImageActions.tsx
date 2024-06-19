import { convertSVGToPNG, generateSVG } from "@/utils/imageUtils";
import { useEffect, useState } from "react";
import CopyToClipboardButton from "./CopyToClipboardButton";
import DownloadButton from "./DownloadButton";
import { ImageGenerator } from "./ImageGenerator";

const ImageActions = ({ image, settings }) => {
  const [pngBlob, setPngBlob] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const generateImageBlob = async () => {
      if (!image) return;
      setLoading(true);
      try {
        const svg = await generateSVG(image, settings);
        const blob = await convertSVGToPNG(
          svg,
          image.width + settings.padding * 2
        );
        setPngBlob(blob);
      } catch (error) {
        console.error("Error processing image:", error);
      } finally {
        setLoading(false);
      }
    };

    generateImageBlob();
  }, [image, settings]);

  return (
    <>
      <ImageGenerator image={image} settings={settings} />
      <div className="flex justify-between mt-4">
        <CopyToClipboardButton imageBlob={pngBlob} loading={loading} />
        <DownloadButton imageBlob={pngBlob} loading={loading} />
      </div>
    </>
  );
};

export default ImageActions;

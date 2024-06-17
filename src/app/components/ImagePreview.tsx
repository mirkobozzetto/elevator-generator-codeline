import { ImagePreviewProps } from "@/types/types";
import Image from "next/image";

const ImagePreview = ({ image, settings }: ImagePreviewProps) => {
  return (
    <>
      {image && (
        <div
          style={{
            display: "flex",
            padding: `${settings.padding}px`,
          }}
        >
          <Image
            src={image.src}
            alt={image.name ?? ""}
            width={image.width}
            height={image.height}
            style={{
              boxShadow: `0 0 ${settings.shadow}px rgba(0,0,0,.${settings.shadow})`,
              borderRadius: `${settings.radius}px`,
            }}
          />
        </div>
      )}
    </>
  );
};

export default ImagePreview;

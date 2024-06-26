import { ImagePreviewProps } from "@/types/types";

const ImagePreview = ({ image, settings }: ImagePreviewProps) => {
  return (
    <div className="border-gray-150 bg-transparent border w-fit h-fit overflow-hidden image-preview">
      {image && (
        <div
          style={{
            display: "flex",
            padding: `${settings.padding}px`,
          }}
        >
          <img
            src={image.src}
            alt={image.name ?? ""}
            width={image.width}
            height={image.height}
            style={{
              boxShadow: `0 0 ${settings.shadow}px rgba(0,0,0,.${settings.shadow})`,
              borderRadius: `${settings.radius}px`,
              maxWidth: "400",
              display: "flex",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImagePreview;

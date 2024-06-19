import { ImagePreviewProps } from "@/types/types";

// Version adaptée pour la génération de SVG
const ImagePreviewForSVG = ({ image, settings }: ImagePreviewProps) => {
  return (
    <div
      style={{
        display: "flex",
        padding: `${settings.padding}px`,
      }}
    >
      <div
        style={{
          boxShadow: `0 0 ${settings.shadow}px rgba(0, 0, 0, ${
            settings.shadow / 100
          })`,
          borderRadius: `${settings.radius}px`,
          maxWidth: "400px",
          display: "flex",
        }}
      >
        <img
          src={image?.src}
          alt={image?.name ?? ""}
          width={image?.width}
          height={image?.height}
          style={{
            borderRadius: `${settings.radius}px`,
          }}
        />
      </div>
    </div>
  );
};

export default ImagePreviewForSVG;

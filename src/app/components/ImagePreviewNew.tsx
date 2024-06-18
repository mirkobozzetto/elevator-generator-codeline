import { ImagePreviewProps } from "@/types/types";
import { useEffect, useRef } from "react";

const ImagePreviewNew = ({ image, settings }: ImagePreviewProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (image && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "transparent";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Dessine l'ombre
        ctx.shadowColor = `rgba(0, 0, 0, ${settings.shadow / 100})`;
        ctx.shadowBlur = settings.shadow;

        ctx.fillRect(
          settings.padding,
          settings.padding,
          image.width,
          image.height
        );

        // Dessine l'image
        const img = new Image();
        img.onload = () => {
          ctx.beginPath();
          ctx.roundRect(
            settings.padding,
            settings.padding,
            image.width,
            image.height,
            settings.radius
          );
          ctx.clip();
          ctx.drawImage(img, settings.padding, settings.padding);
        };
        img.src = image.src;
      }
    }
  }, [image, settings]);

  if (!image) {
    return null;
  }

  return (
    <div
      className="border-gray-150 bg-transparent border w-fit h-fit overflow-hidden image-preview"
      style={{
        maxWidth: "400",
        display: "flex",
      }}
    >
      <canvas
        ref={canvasRef}
        width={image.width + settings.padding * 2}
        height={image.height + settings.padding * 2}
      />
    </div>
  );
};

export default ImagePreviewNew;

import { Dimensions, ImageState, SettingsProps } from "@/types/types";
import { Canvg } from "canvg";
import Image from "next/image";
import satori from "satori";

export async function generateSVG(
  image: ImageState,
  settings: SettingsProps
): Promise<string> {
  const svg = await satori(
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
        <Image
          src={image.src}
          width={image.width}
          height={image.height}
          alt={image.name ?? ""}
        />
      </div>
    </div>,
    {
      width: image.width + settings.padding * 2,
      height: image.height + settings.padding * 2,
      fonts: [],
    }
  );

  console.log("Generated SVG:", svg);
  return svg;
}

export async function convertSVGToPNG(
  svg: string,
  dimensions: Dimensions
): Promise<string> {
  const canvas = document.createElement("canvas");
  canvas.width = dimensions.width;
  canvas.height = dimensions.height;

  const context = canvas.getContext("2d");
  if (context) {
    const canvgInstance = Canvg.fromString(context, svg);
    await canvgInstance.start();

    // Vérification supplémentaire
    const dataUrl = canvas.toDataURL();
    console.log("Canvas data URL:", dataUrl);
  }

  return canvas.toDataURL("image/png");
}

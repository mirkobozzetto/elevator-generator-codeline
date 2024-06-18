import { ImageState, SettingsProps } from "@/types/types";
import { Canvg } from "canvg";
import Image from "next/image";
import satori from "satori";

export async function generateSVG(
  image: ImageState,
  settings: SettingsProps
): Promise<string> {
  const svg = await satori(
    <div style={{ display: "flex" }}>
      <Image
        src={image.src}
        width={image.width}
        height={image.height}
        alt="example"
      />
    </div>,
    {
      width: image.width,
      height: image.height,
      fonts: [],
    }
  );

  return svg;
}

export async function convertSVGToPNG(
  svg: string,
  width: number,
  height: number
): Promise<string> {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (context) {
    const canvgInstance = Canvg.fromString(context, svg);
    await canvgInstance.start();
  }

  return canvas.toDataURL("image/png");
}

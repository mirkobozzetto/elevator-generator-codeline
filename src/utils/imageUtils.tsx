import { ImageState, SettingsProps } from "@/types/types";
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

import { ImageState, SettingsProps } from "@/types/types";
import { Resvg, ResvgRenderOptions } from "@resvg/resvg-wasm";
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
): Promise<Uint8Array> {
  const opts: ResvgRenderOptions = {
    fitTo: {
      mode: "zoom",
      value: width,
    },
    font: {
      loadSystemFonts: false,
    },
  };

  const resvg = new Resvg(svg, opts);
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return pngBuffer;
}

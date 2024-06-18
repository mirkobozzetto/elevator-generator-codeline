import * as resvg from "@resvg/resvg-wasm";

export async function convertSVGToPNG(
  svg: string,
  width: number,
  _height: number
): Promise<Uint8Array> {
  const opts = {
    fitTo: {
      mode: "width" as "width",
      value: width,
    },
  };

  const renderer = new resvg.Resvg(svg, opts);
  const pngData = renderer.render();
  const pngBuffer = pngData.asPng();

  return pngBuffer;
}

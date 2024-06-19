import * as resvg from "@resvg/resvg-wasm";

async function initWasm() {
  const response = await fetch(
    new URL("@resvg/resvg-wasm/index_bg.wasm", import.meta.url)
  );
  await resvg.initWasm(response);
  postMessage({ type: "wasmInitialized" });
}

initWasm();

self.addEventListener("message", async (event) => {
  const { _id, svg, width } = event.data;

  try {
    if (!svg || width <= 0) {
      throw new Error("Invalid SVG data or dimensions.");
    }

    const renderer = new resvg.Resvg(svg, {
      fitTo: {
        mode: "width",
        value: width,
      },
    });

    const image = renderer.render();
    const pngBuffer = image.asPng();

    if (!pngBuffer || pngBuffer.length === 0) {
      throw new Error("Rendered PNG buffer is empty or undefined.");
    }

    const blob = new Blob([pngBuffer], { type: "image/png" });
    self.postMessage({ _id, blob });
  } catch (error) {
    self.postMessage({ _id, error: (error as Error).message });
  }
});

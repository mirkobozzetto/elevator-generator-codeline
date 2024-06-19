import { ImageState, SettingsProps } from "@/types/types";
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
        <img
          src={image.src}
          width={image.width}
          height={image.height}
          alt={image.name ?? ""}
          style={{
            borderRadius: `${settings.radius}px`,
          }}
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

export const convertSVGToPNGWorker = async ({
  svg,
  width,
}: {
  svg: string;
  width: number;
}): Promise<Blob> => {
  if (typeof window === "undefined") {
    throw new Error(
      "convertSVGToPNGWorker can only be used in a browser environment"
    );
  }

  const worker = new Worker(new URL("./resvg-worker.ts", import.meta.url), {
    type: "module",
  });
  let wasmInitialized = false;

  return new Promise<Blob>((resolve, reject) => {
    worker.onmessage = (e: MessageEvent) => {
      if (e.data.type === "wasmInitialized") {
        wasmInitialized = true;
        worker.postMessage({ _id: Math.random(), svg, width });
      } else if (e.data.blob) {
        resolve(e.data.blob);
      } else if (e.data.error) {
        console.error("Error from worker:", e.data.error);
        reject(new Error(e.data.error));
      }
    };

    worker.onerror = (error) => {
      console.error("Worker error:", error);
      reject(error);
    };

    if (wasmInitialized) {
      worker.postMessage({ _id: Math.random(), svg, width });
    }
  });
};

export async function convertSVGToPNG(
  svg: string,
  width: number
): Promise<Blob> {
  try {
    const pngBlob = await convertSVGToPNGWorker({ svg, width });
    return pngBlob;
  } catch (error) {
    console.error("Error converting SVG to PNG:", error);
    return new Blob();
  }
}

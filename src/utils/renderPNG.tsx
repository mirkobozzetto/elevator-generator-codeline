import ImagePreview from "@/app/components/ImagePreview";
import { ImageState, SettingsProps } from "@/types/types";
import satori, { SatoriOptions } from "satori";

const convertSVGToPNG = (() => {
  if (typeof window === "undefined") {
    return;
  }

  console.log("Start worker", import.meta.url);

  const worker = new Worker(new URL("./resvg-worker.js", import.meta.url));

  const pending = new Map();

  worker.onmessage = (e: MessageEvent) => {
    const resolve = pending.get(e.data._id);

    if (resolve) {
      resolve(e.data);
      pending.delete(e.data._id);
    }
  };

  return async ({ svg, width }: { svg: string; width: number }) => {
    const message = {
      _id: Math.random(),
      svg,
      width,
    };

    worker.postMessage(message);

    return new Promise((resolve) => {
      pending.set(message._id, resolve);
    });
  };
})();

const CANVAS_SIZE = 400;

export async function renderPNG({
  image,
  settings,
}: {
  image: ImageState;
  settings: SettingsProps;
}) {
  const scale = image.width / CANVAS_SIZE;

  const newSettings = {
    padding: settings.padding * scale,
    shadow: settings.shadow * scale,
    radius: settings.radius * scale,
  };

  const svg = await satori(
    <div style={{ display: "flex" }}>
      <ImagePreview settings={newSettings} image={image} />
      <div style={{ display: "none" }}></div>
    </div>,
    newSettings as unknown as SatoriOptions
  );

  const messageData = await convertSVGToPNG?.({
    svg,
    width: image.width,
  });

  return messageData;
}

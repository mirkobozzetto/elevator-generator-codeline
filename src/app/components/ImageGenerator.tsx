import { ImageGeneratorProps } from "@/types/types";
import ImagePreview from "./ImagePreview";

export const ImageGenerator = ({ settings, image }: ImageGeneratorProps) => {
  if (!image) {
    // ...
  }

  return (
    <>
      <ImagePreview image={image} settings={settings} />
    </>
  );
};

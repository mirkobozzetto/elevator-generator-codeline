import { ImageGeneratorProps } from "@/types/types";
import ImagePreview from "./ImagePreview";

export const ImageGenerator = ({ settings, image }: ImageGeneratorProps) => {
  if (!image) {
    <div role="alert" className="alert alert-error">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>Download an image please...</span>
    </div>;
  }

  return (
    <>
      <ImagePreview image={image} settings={settings} />
    </>
  );
};

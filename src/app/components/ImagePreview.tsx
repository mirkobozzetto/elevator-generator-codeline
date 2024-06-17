import { ImageState } from "@/types/types";
import Image from "next/image";

type ImagePreviewProps = {
  image: ImageState | undefined;
};

const ImagePreview = ({ image }: ImagePreviewProps) => {
  return (
    <>
      {image && (
        <Image
          src={image.src}
          alt={image.name ?? ""}
          width={image.width}
          height={image.height}
        />
      )}
    </>
  );
};

export default ImagePreview;

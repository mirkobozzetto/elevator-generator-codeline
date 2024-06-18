import { ChangeEvent } from "react";

export type FileChangeEvent = ChangeEvent<HTMLInputElement>;

export type SettingsProps = {
  padding: number;
  shadow: number;
  radius: number;
};

export type InputFileProps = {
  onChange: (e: FileChangeEvent) => void;
};

export type ImagePreviewProps = {
  image: ImageState | undefined;
  settings: SettingsProps;
};

export type InputRangeProps = {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type ImageState = {
  width: number;
  height: number;
  src: string;
  name: string | undefined;
  // svg: string | undefined;
};

export type ImageGeneratorProps = {
  settings: SettingsProps;
  image: ImageState;
};

export type DownloadButtonProps = {
  image: ImageState;
  settings: SettingsProps;
};

export type Dimensions = {
  width: number;
  height: number;
};

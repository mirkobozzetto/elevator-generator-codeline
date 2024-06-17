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
};

import { ChangeEvent } from "react";

export type FileChangeEvent = ChangeEvent<HTMLInputElement>;

export type ImageState = {
  width: number;
  height: number;
  src: string;
};

"use client";

import { initResvg } from "@/utils/resvg";
import { useEffect } from "react";

const ResvgInitializer = () => {
  useEffect(() => {
    initResvg();
  }, []);

  return null;
};

export default ResvgInitializer;

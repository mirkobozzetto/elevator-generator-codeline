"use client";

import { initResvgWasm } from "@/utils/initWasm";
import { useEffect } from "react";

export default function WasmInitializer() {
  useEffect(() => {
    initResvgWasm();
  }, []);

  return null;
}

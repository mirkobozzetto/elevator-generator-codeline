import { initWasm } from "@resvg/resvg-wasm";

let wasmInitialized = false;

export async function initResvgWasm() {
  try {
    await initWasm(fetch("/resvg.wasm"));
    wasmInitialized = true;
  } catch (err) {
    console.error("Failed to initialize Wasm:", err);
  }
}

export function isWasmInitialized() {
  return wasmInitialized;
}

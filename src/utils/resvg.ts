import { initWasm } from "@resvg/resvg-wasm";

export async function initResvg() {
  try {
    await initWasm(fetch("../index_bg.wasm"));
  } catch (error) {
    console.error("Resvg wasm not initialized", error);
  }
}

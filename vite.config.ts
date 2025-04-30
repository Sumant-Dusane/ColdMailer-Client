import path from "path";
import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { crx, ManifestV3Export } from "@crxjs/vite-plugin";
import manifestJson from "./public/manifest.json";

const manifest = manifestJson as unknown as ManifestV3Export;

const viteManifestHackIssue846: Plugin & {
  renderCrxManifest: (manifest: any, bundle: any) => void;
} = {
  // Workaround from https://github.com/crxjs/chrome-extension-tools/issues/846#issuecomment-1861880919.
  name: "manifestHackIssue846",
  renderCrxManifest(_manifest: any, bundle: any) {
    bundle["manifest.json"] = bundle[".vite/manifest.json"];
    bundle["manifest.json"].fileName = "manifest.json";
    delete bundle[".vite/manifest.json"];
  },
};

export default defineConfig({
  plugins: [react(), viteManifestHackIssue846, crx({ manifest })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true,
    copyPublicDir: false,
    emptyOutDir: true,
    modulePreload: {
      polyfill: false,
    },
    manifest: false,
    rollupOptions: {},
  },
});

const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..");
const sourceAssetsDir = path.join(rootDir, "assets");
const distDir = path.join(rootDir, "dist");
const targetAssetsDir = path.join(distDir, "assets");

if (!fs.existsSync(sourceAssetsDir)) {
  throw new Error(`Missing source assets directory: ${sourceAssetsDir}`);
}

if (!fs.existsSync(distDir)) {
  throw new Error(`Missing dist directory. Run build first: ${distDir}`);
}

fs.mkdirSync(targetAssetsDir, { recursive: true });
fs.cpSync(sourceAssetsDir, targetAssetsDir, { recursive: true, force: true });

console.log("Copied static image assets into dist/assets for deployment.");

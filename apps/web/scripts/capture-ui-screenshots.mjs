/**
 * Captures product lifecycle screenshots from public/mockups/cloutflow-ui-v2.html
 * Run: node scripts/capture-ui-screenshots.mjs
 */
import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.join(__dirname, "..");
const htmlPath = path.join(webRoot, "public/mockups/cloutflow-ui-v2.html");
const outDir = path.join(webRoot, "public/product");

/** screen id in HTML → output filename */
const captures = [
  { screen: "discover", file: "discover.png" },
  { screen: "discover", file: "hero.png" },
  { screen: "decode", file: "decode.png" },
  { screen: "price", file: "price.png" },
  { screen: "launch", file: "campaigns.png" },
  { screen: "verify", file: "verify.png" },
  { screen: "measure", file: "measure.png" },
  { screen: "loop", file: "loop.png" },
];

const fileUrl = `file://${htmlPath}`;

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});

await page.goto(fileUrl, { waitUntil: "networkidle" });
await page.waitForFunction(() => typeof window.go === "function");

for (const { screen, file } of captures) {
  await page.evaluate((id) => window.go(id), screen);
  await page.waitForTimeout(400);
  const app = page.locator(".app");
  await app.waitFor({ state: "visible" });
  await app.screenshot({
    path: path.join(outDir, file),
    type: "png",
  });
  console.log(`Wrote ${file} (${screen})`);
}

await browser.close();
console.log("Done.");

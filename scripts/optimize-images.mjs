import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const projectRoot = process.cwd();
const imageSources = [
  {
    label: "menu",
    inputDir: path.join(projectRoot, "public", "images", "menu"),
    outputDir: path.join(
      projectRoot,
      "public",
      "images",
      "optimized",
      "menu"
    ),
    width: 640,
    quality: 82,
  },
  {
    label: "brand",
    inputDir: path.join(projectRoot, "public", "images", "brand"),
    outputDir: path.join(
      projectRoot,
      "public",
      "images",
      "optimized",
      "brand"
    ),
    width: 512,
    quality: 85,
  },
];

const supportedExtensions = new Set([".jpg", ".jpeg", ".png"]);

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function readImageFiles(inputDir) {
  if (!(await pathExists(inputDir))) {
    return [];
  }

  const entries = await fs.readdir(inputDir, { withFileTypes: true });

  return entries
    .filter((entry) => {
      if (entry.name === ".gitkeep") {
        return false;
      }

      if (entry.isDirectory()) {
        return entry.name !== "optimized";
      }

      return supportedExtensions.has(path.extname(entry.name).toLowerCase());
    })
    .filter((entry) => entry.isFile())
    .map((entry) => path.join(inputDir, entry.name))
    .sort((firstPath, secondPath) =>
      path.basename(firstPath).localeCompare(path.basename(secondPath))
    );
}

async function optimizeImage({ filePath, outputDir, width, quality }) {
  const outputFileName = `${path.parse(filePath).name}.webp`;
  const outputPath = path.join(outputDir, outputFileName);

  await sharp(filePath)
    .resize({
      width,
      withoutEnlargement: true,
    })
    .webp({ quality })
    .toFile(outputPath);

  return outputPath;
}

async function optimizeGroup(config) {
  await fs.mkdir(config.outputDir, { recursive: true });

  const imageFiles = await readImageFiles(config.inputDir);

  if (!imageFiles.length) {
    console.log(`[${config.label}] Tidak ada gambar untuk diproses.`);
    return { failed: 0, processed: 0 };
  }

  console.log(
    `[${config.label}] Memproses ${imageFiles.length} gambar dari ${path.relative(
      projectRoot,
      config.inputDir
    )}`
  );

  let processed = 0;
  let failed = 0;
  const outputNames = new Set();

  for (const filePath of imageFiles) {
    const outputName = `${path.parse(filePath).name}.webp`;

    if (outputNames.has(outputName)) {
      console.log(
        `[${config.label}] Lewati ${path.basename(
          filePath
        )} karena ${outputName} sudah dibuat.`
      );
      continue;
    }

    outputNames.add(outputName);

    try {
      const outputPath = await optimizeImage({ filePath, ...config });
      processed += 1;
      console.log(
        `[${config.label}] OK ${path.basename(filePath)} -> ${path.relative(
          projectRoot,
          outputPath
        )}`
      );
    } catch (error) {
      failed += 1;
      console.warn(
        `[${config.label}] Gagal memproses ${path.basename(filePath)}: ${
          error.message
        }`
      );
    }
  }

  return { failed, processed };
}

let totalProcessed = 0;
let totalFailed = 0;

for (const config of imageSources) {
  const result = await optimizeGroup(config);
  totalProcessed += result.processed;
  totalFailed += result.failed;
}

console.log(
  `Selesai optimasi gambar. Berhasil: ${totalProcessed}. Gagal: ${totalFailed}.`
);

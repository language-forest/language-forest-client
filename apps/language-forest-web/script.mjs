import fs from "fs";
import path from "path";
import { glob } from "glob";

// SVG 파일 디렉토리 경로
const svgDir = "./src/component/design-system/icon/raw"; // SVG 파일이 있는 디렉토리 경로

console.log("Script started...");

// SVG 파일 수정 함수
const processSVG = (filePath) => {
  console.log(`Processing file: ${filePath}`);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file: ${filePath}`, err);
      return;
    }

    console.log("Original SVG content read successfully.");

    // 1. `width`와 `height` 제거
    let updatedSVG = data.replace(
      /<svg([^>]*)\s(width|height)="[^"]*"/g,
      "<svg$1",
    );

    // 2. `fill`을 `currentColor`로 변경
    updatedSVG = updatedSVG.replace(/fill="[^"]*"/g, 'fill="currentColor"');

    console.log("SVG content updated.");

    // 파일 저장
    fs.writeFile(filePath, updatedSVG, "utf8", (err) => {
      if (err) {
        console.error(`Error writing file: ${filePath}`, err);
        return;
      }
      console.log(`Successfully processed: ${filePath}`);
    });
  });
};

// 비동기로 모든 SVG 파일 처리
const processFiles = async () => {
  try {
    console.log("Looking for SVG files...");
    const files = await glob(`${svgDir}/**/*.svg`, { nodir: true });

    if (files.length === 0) {
      console.warn("No SVG files found in the specified directory!");
      return;
    }

    console.log(`Found ${files.length} SVG file(s).`);

    files.forEach((file) => processSVG(file));
  } catch (err) {
    console.error("Error finding SVG files:", err);
  }
};

// 실행
processFiles();
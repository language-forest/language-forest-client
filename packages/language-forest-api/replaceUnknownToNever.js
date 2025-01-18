const fs = require("fs");
const path = require("path");

// 대상 디렉토리 및 파일 설정
const targetDir = path.resolve(__dirname, "./src/generated"); // API 파일이 생성되는 경로

const processFile = (filePath) => {
  let content = fs.readFileSync(filePath, "utf-8");
  console.log(content);

  // 1. `unknown` 타입을 `never`로 변환
  content = content.replaceAll(/(\w+)\?: unknown;/g, "$1?: never;"); // 옵셔널 속성에서 unknown 변환
  content = content.replaceAll(/(\w+): unknown;/g, "$1: never;"); // 필수 속성에서 unknown 변환

  // 파일 다시 쓰기
  fs.writeFileSync(filePath, content, "utf-8");
  console.info(`Processed ${filePath}`);
};

const exploreDir = (currentPath) => {
  const files = fs.readdirSync(currentPath);

  files.forEach((file) => {
    const fullPath = path.join(currentPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      exploreDir(fullPath); // 하위 디렉토리 탐색
    } else if (file.endsWith(".ts")) {
      processFile(fullPath); // .ts 파일 처리
    }
  });
};

// 스크립트 실행
exploreDir(targetDir);
console.info("All TypeScript files processed!");

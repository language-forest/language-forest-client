import fs from "fs";
import path from "path";
import { glob } from "glob";

// SVG 파일 경로
const svgDir = "./src/component/design-system/icon/raw"; // SVG 파일 경로
const outputFilePath = "./src/component/design-system/icon/LFIcon.tsx"; // 생성될 LFIcon.tsx 파일 경로

// 파일 이름에서 확장자 제거
const getFileName = (filePath) =>
  path.basename(filePath, path.extname(filePath));

// 안전한 변수명으로 변환
const toSafeVariableName = (fileName) =>
  fileName.replace(/[^a-zA-Z0-9_]/g, "_"); // 알파벳, 숫자, _만 허용

// LFIcon.tsx 파일 생성 함수
const generateIconComponent = async () => {
  try {
    console.log("Fetching SVG files...");
    const files = await glob(`${svgDir}/**/*.svg`, { nodir: true });

    if (files.length === 0) {
      console.warn("No SVG files found to generate LFIcon.tsx!");
      return;
    }

    console.log(`Found ${files.length} SVG file(s).`);

    // Extract variants and imports
    const imports = files
      .map((filePath) => {
        const originalFileName = getFileName(filePath);
        const safeVariableName = toSafeVariableName(originalFileName);
        const relativePath = `./raw/${originalFileName}.svg`;
        return `import ${safeVariableName} from '${relativePath}';`;
      })
      .join("\n");

    const iconMappings = files
      .map((filePath) => {
        const originalFileName = getFileName(filePath);
        const safeVariableName = toSafeVariableName(originalFileName);
        return `  "${originalFileName}": ${safeVariableName},`;
      })
      .join("\n");

    const variantTypes = files
      .map((filePath) => `"${getFileName(filePath)}"`)
      .join(" | ");

    // Generate LFIcon.tsx content
    const componentContent = `import React from 'react';

${imports}

const icons = {
${iconMappings}
};

export type IconVariant = ${variantTypes};

interface IconProps extends React.SVGProps<SVGSVGElement> {
  variant: IconVariant;
}

const Icon: React.FC<IconProps> = ({ variant, ...props }) => {
  const IconComponent = icons[variant];
  return <IconComponent {...props} />;
};

export default Icon;
`;

    // Write to LFIcon.tsx
    fs.writeFileSync(outputFilePath, componentContent, "utf8");
    console.log(`Icon.tsx generated successfully at ${outputFilePath}`);
  } catch (err) {
    console.error("Error generating LFIcon.tsx:", err);
  }
};

// 실행
generateIconComponent();

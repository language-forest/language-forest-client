const fs = require('fs');
const path = require('path');

// 대상 디렉토리 설정 (API가 생성되는 경로)
const targetDir = path.resolve(__dirname, './src/generated/api');
const outputFile = path.resolve(targetDir, 'index.ts');

const generateIndexFile = (dir, output) => {
    let exportStatements = '';

    // 디렉토리 탐색
    const exploreDir = (currentPath) => {
        const files = fs.readdirSync(currentPath);

        files.forEach((file) => {
            const fullPath = path.join(currentPath, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                exploreDir(fullPath);
            } else if (file.endsWith('.ts') && file !== 'index.ts') {
                const relativePath = path.relative(targetDir, fullPath).replace(/\.ts$/, '');
                exportStatements += `export * from './${relativePath}';\n`;
            }
        });
    };

    exploreDir(dir);

    // `index.ts` 생성
    fs.writeFileSync(output, exportStatements);
    console.log(`Generated index.ts at ${output}`);
};

generateIndexFile(targetDir, outputFile);

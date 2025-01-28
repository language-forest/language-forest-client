import { google } from "googleapis";
import fs from "fs";
import path from "path";

// 서비스 계정 JSON 파일 경로
const keyFilePath = "./get-i18n/sheet.json";

// 스프레드시트 ID와 범위
const spreadsheetId = "1bWimb3cGzqFdpVT-7ePY9o9NsjxlCrnD9vwtizC7JJ0"; // URL에서 추출
const range = "i18n"; // 시트 전체 가져오기

// Google Sheets API 데이터를 가져오는 함수
async function fetchSpreadsheetData(): Promise<string[][]> {
  const auth = new google.auth.GoogleAuth({
    keyFile: keyFilePath,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    return response.data.values || [];
  } catch (error) {
    console.error("Error fetching spreadsheet data:", error);
    return [];
  }
}

// 데이터를 언어별로 변환
function transformToLocaleData(
  data: string[][],
): Record<string, Record<string, string>> {
  const [headers, ...rows] = data;
  const keys = headers.slice(1); // "ko", "en" 등

  const localeData: Record<string, Record<string, string>> = keys.reduce(
    (acc, locale) => {
      acc[locale] = {};
      return acc;
    },
    {} as Record<string, Record<string, string>>,
  );

  rows.forEach((row) => {
    const key = row[0];
    keys.forEach((locale, index) => {
      localeData[locale][key] = row[index + 1];
    });
  });

  return localeData;
}

// 파일 생성
function generateLocaleFiles(
  localeData: Record<string, Record<string, string>>,
  outputDir: string,
) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  Object.entries(localeData).forEach(([locale, translations]) => {
    const filePath = path.join(outputDir, `${locale}.ts`);
    const fileContent = `export default ${JSON.stringify(translations, null, 2)};\n`;

    fs.writeFileSync(filePath, fileContent, "utf8");
    console.log(`Generated: ${filePath}`);
  });
}

// 실행
async function main() {
  const outputDir = path.join(__dirname, "locales"); // 출력 디렉토리
  const data = await fetchSpreadsheetData();

  if (data.length === 0) {
    console.error("No data found in spreadsheet.");
    return;
  }

  const localeData = transformToLocaleData(data);
  generateLocaleFiles(localeData, outputDir);
}

main();

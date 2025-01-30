// MBTI 설명 상수 정의
const E = "주변 사람들";
const I = "혼자만의 시간";
const S = "현실적인 실용성";
const N = "전체적인 아이디어";
const F = "사람의 감정을 고려";
const T = "논리를 고려";
const J = "계획적인 편";
const P = "즉흥적인 편";

// MBTI 정보 배열
export const MBTIInfos = [
  {
    title: "⚡️ 에너지를 어디서 얻나요?",
    key: "IE",
    values: [
      { text: E, value: "E" },
      { text: I, value: "I" },
    ],
  },
  {
    title: "📍 나에게 더 중요한 것은?",
    key: "NS",
    values: [
      { text: S, value: "S" },
      { text: N, value: "N" },
    ],
  },
  {
    title: "🗝️ 문제를 해결하고자 할 때",
    key: "FT",
    values: [
      { text: F, value: "F" },
      { text: T, value: "T" },
    ],
  },
  {
    title: "🗓️ 평소 어느 쪽에 더 가까우신가요?",
    key: "PJ",
    values: [
      { text: J, value: "J" },
      { text: P, value: "P" },
    ],
  },
] as const;

// MBTI 변환기 (상수를 사용)
export const MBTITransformer = (key: MBTIKey) => {
  switch (key) {
    case "E":
      return E;
    case "I":
      return I;
    case "S":
      return S;
    case "N":
      return N;
    case "F":
      return F;
    case "T":
      return T;
    case "J":
      return J;
    case "P":
      return P;
    default:
      return "";
  }
};

export type MBTIGroupKey = (typeof MBTIInfos)[number]["key"];
export type MBTIKey = (typeof MBTIInfos)[number]["values"][number]["value"];

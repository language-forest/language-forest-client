export const LFFontSize = {
  largeTitle: { size: 34, lienHeight: 42, letterSpacing: -0.4 },
  title1: { size: 28, lienHeight: 34, letterSpacing: -0.4 },
  title2: { size: 22, lienHeight: 34, letterSpacing: -0.4 },
  title3: { size: 20, lienHeight: 26, letterSpacing: -0.3 },
  headline: { size: 17, lienHeight: 26, letterSpacing: -0.3 },
  body: { size: 17, lienHeight: 22, letterSpacing: 0 },
  callout: { size: 16, lienHeight: 24, letterSpacing: 0 },
  subHeadline: { size: 15, lienHeight: 22, letterSpacing: 0 },
  footnote: { size: 13, lienHeight: 18, letterSpacing: 0 },
  caption1: { size: 12, lienHeight: 16, letterSpacing: 0 },
  caption2: { size: 11, lienHeight: 13, letterSpacing: 0 },
} as const;

export type LFFontSizeType = keyof typeof LFFontSize;

export const LFFontWeight = {
  R: 400,
  M: 700,
  B: 800,
} as const;

export type LFFontWeightType = keyof typeof LFFontWeight;

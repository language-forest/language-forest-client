// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// ===================== 1) 모든 SVG 파일 import =====================
// (질문에 기재된 그대로 나열했습니다.)
import topNav_shop from "./raw/topNav.shop.svg";
import topNav_bell from "./raw/topNav.bell.svg";
import topNav_bell_dot from "./raw/topNav.bell.dot.svg";
import bottomNav_star from "./raw/bottomNav.star.svg";
import bottomNav_home from "./raw/bottomNav.home.svg";
import bottomNav_book from "./raw/bottomNavBook.svg";

import Weight_R_xMark from "./raw/Weight=R.xMark.svg";
import Weight_R_speaker_wave_fill from "./raw/Weight=R.speaker.wave.fill.svg";
import Weight_R_mic from "./raw/Weight=R.mic.svg";
import Weight_R_keyboard from "./raw/Weight=R.keyboard.svg";
import Weight_R_ellipsis from "./raw/Weight=R.ellipsis.svg";
import Weight_R_chevron_up from "./raw/Weight=R.chevron.up.svg";
import Weight_R_chevron_right from "./raw/Weight=R.chevron.right.svg";
import Weight_R_chevron_left from "./raw/Weight=R.chevron.left.svg";
import Weight_R_chevron_down from "./raw/Weight=R.chevron.down.svg";
import Weight_R_check from "./raw/Weight=R.check.svg";
import Weight_R_carrow_2_circle from "./raw/Weight=R.carrow.2.circle.svg";
import Weight_R_arrow_up from "./raw/Weight=R.arrow.up.svg";
import Weight_R_arrow_right from "./raw/Weight=R.arrow.right.svg";
import Weight_R_arrow_left from "./raw/Weight=R.arrow.left.svg";
import Weight_R_arrow_down from "./raw/Weight=R.arrow.down.svg";

import Weight_M_xMark from "./raw/Weight=M.xMark.svg";
import Weight_M_speaker_wave_fill from "./raw/Weight=M.speaker.wave.fill.svg";
import Weight_M_mic from "./raw/Weight=M.mic.svg";
import Weight_M_keyboard from "./raw/Weight=M.keyboard.svg";
import Weight_M_ellipsis from "./raw/Weight=M.ellipsis.svg";
import Weight_M_chevron_up from "./raw/Weight=M.chevron.up.svg";
import Weight_M_chevron_right from "./raw/Weight=M.chevron.right.svg";
import Weight_M_chevron_left from "./raw/Weight=M.chevron.left.svg";
import Weight_M_chevron_down from "./raw/Weight=M.chevron.down.svg";
import Weight_M_check from "./raw/Weight=M.check.svg";
import Weight_M_carrow_2_circle from "./raw/Weight=M.carrow.2.circle.svg";
import Weight_M_arrow_up from "./raw/Weight=M.arrow.up.svg";
import Weight_M_arrow_right from "./raw/Weight=M.arrow.right.svg";
import Weight_M_arrow_left from "./raw/Weight=M.arrow.left.svg";
import Weight_M_arrow_down from "./raw/Weight=M.arrow.down.svg";

import Weight_B_xMark from "./raw/Weight=B.xMark.svg";
import Weight_B_speaker_wave_fill from "./raw/Weight=B.speaker.wave.fill.svg";
import Weight_B_mic from "./raw/Weight=B.mic.svg";
import Weight_B_keyboard from "./raw/Weight=B.keyboard.svg";
import Weight_B_ellipsis from "./raw/Weight=B.ellipsis.svg";
import Weight_B_chevron_up from "./raw/Weight=B.chevron.up.svg";
import Weight_B_chevron_right from "./raw/Weight=B.chevron.right.svg";
import Weight_B_chevron_left from "./raw/Weight=B.chevron.left.svg";
import Weight_B_chevron_down from "./raw/Weight=B.chevron.down.svg";
import Weight_B_check from "./raw/Weight=B.check.svg";
import Weight_B_carrow_2_circle from "./raw/Weight=B.carrow.2.circle.svg";
import Weight_B_arrow_up from "./raw/Weight=B.arrow.up.svg";
import Weight_B_arrow_right from "./raw/Weight=B.arrow.right.svg";
import Weight_B_arrow_left from "./raw/Weight=B.arrow.left.svg";
import Weight_B_arrow_down from "./raw/Weight=B.arrow.down.svg";
import { LFColor, LFColorType } from "@repo/shared/constant";

// ===================== 2) Weighted / NonWeighted Variant 구분 =====================

/**
 * (A) weight가 필요한 아이콘 (이름만 적음: "xMark", "speaker.wave.fill", "mic", ...)
 * - 이 아이콘들은 <LFIcon variant="xMark" weight="R" /> 같이 weight를 꼭 써야 함
 */
type WeightedVariant =
  | "xMark"
  | "speaker.wave.fill"
  | "mic"
  | "keyboard"
  | "ellipsis"
  | "chevron.up"
  | "chevron.right"
  | "chevron.left"
  | "chevron.down"
  | "check"
  | "carrow.2.circle"
  | "arrow.up"
  | "arrow.right"
  | "arrow.left"
  | "arrow.down";

/**
 * (B) weight가 없어야 하는(=쓰면 안 되는) 아이콘
 *   예: "bottomNav.home", "topNav.bell", etc.
 */
type NonWeightedVariant =
  | "topNav.shop"
  | "topNav.bell"
  | "topNav.bell.dot"
  | "bottomNav.star"
  | "bottomNav.home"
  | "bottomNav.book";

type IconKey =
  | `Weight=R.${WeightedVariant}`
  | `Weight=M.${WeightedVariant}`
  | `Weight=B.${WeightedVariant}`
  | NonWeightedVariant;

// ===================== 3) icons Dictionary (파일명 매핑) =====================
// 실제 키 예: "Weight=R.xMark" → Weight_R_xMark (import)
//            "bottomNav.home"  → bottomNav_home
const icons = {
  // --- (A) Weighted 아이콘 ---
  "Weight=R.xMark": Weight_R_xMark,
  "Weight=R.speaker.wave.fill": Weight_R_speaker_wave_fill,
  "Weight=R.mic": Weight_R_mic,
  "Weight=R.keyboard": Weight_R_keyboard,
  "Weight=R.ellipsis": Weight_R_ellipsis,
  "Weight=R.chevron.up": Weight_R_chevron_up,
  "Weight=R.chevron.right": Weight_R_chevron_right,
  "Weight=R.chevron.left": Weight_R_chevron_left,
  "Weight=R.chevron.down": Weight_R_chevron_down,
  "Weight=R.check": Weight_R_check,
  "Weight=R.carrow.2.circle": Weight_R_carrow_2_circle,
  "Weight=R.arrow.up": Weight_R_arrow_up,
  "Weight=R.arrow.right": Weight_R_arrow_right,
  "Weight=R.arrow.left": Weight_R_arrow_left,
  "Weight=R.arrow.down": Weight_R_arrow_down,

  "Weight=M.xMark": Weight_M_xMark,
  "Weight=M.speaker.wave.fill": Weight_M_speaker_wave_fill,
  "Weight=M.mic": Weight_M_mic,
  "Weight=M.keyboard": Weight_M_keyboard,
  "Weight=M.ellipsis": Weight_M_ellipsis,
  "Weight=M.chevron.up": Weight_M_chevron_up,
  "Weight=M.chevron.right": Weight_M_chevron_right,
  "Weight=M.chevron.left": Weight_M_chevron_left,
  "Weight=M.chevron.down": Weight_M_chevron_down,
  "Weight=M.check": Weight_M_check,
  "Weight=M.carrow.2.circle": Weight_M_carrow_2_circle,
  "Weight=M.arrow.up": Weight_M_arrow_up,
  "Weight=M.arrow.right": Weight_M_arrow_right,
  "Weight=M.arrow.left": Weight_M_arrow_left,
  "Weight=M.arrow.down": Weight_M_arrow_down,

  "Weight=B.xMark": Weight_B_xMark,
  "Weight=B.speaker.wave.fill": Weight_B_speaker_wave_fill,
  "Weight=B.mic": Weight_B_mic,
  "Weight=B.keyboard": Weight_B_keyboard,
  "Weight=B.ellipsis": Weight_B_ellipsis,
  "Weight=B.chevron.up": Weight_B_chevron_up,
  "Weight=B.chevron.right": Weight_B_chevron_right,
  "Weight=B.chevron.left": Weight_B_chevron_left,
  "Weight=B.chevron.down": Weight_B_chevron_down,
  "Weight=B.check": Weight_B_check,
  "Weight=B.carrow.2.circle": Weight_B_carrow_2_circle,
  "Weight=B.arrow.up": Weight_B_arrow_up,
  "Weight=B.arrow.right": Weight_B_arrow_right,
  "Weight=B.arrow.left": Weight_B_arrow_left,
  "Weight=B.arrow.down": Weight_B_arrow_down,

  // --- (B) NonWeighted 아이콘 ---
  "topNav.shop": topNav_shop,
  "topNav.bell": topNav_bell,
  "topNav.bell.dot": topNav_bell_dot,
  "bottomNav.star": bottomNav_star,
  "bottomNav.home": bottomNav_home,
  "bottomNav.book": bottomNav_book,
};

// ===================== 4) Props 정의 (유니온) =====================
/** weight가 필요한 아이콘 (variant ∈ WeightedVariant) */
interface WeightedIconProps {
  color: LFColorType;
  variant: WeightedVariant;
  weight: "R" | "M" | "B"; // 필수
  size?: number; // <img> width/height
}

/** weight가 없어야 하는 아이콘 (variant ∈ NonWeightedVariant) */
interface NonWeightedIconProps {
  color: LFColorType;
  variant: NonWeightedVariant;
  size?: number;
  // weight 주면 에러
}

/** 최종 유니온 타입 → TS가 조합 오류를 잡아줌 */
export type IconProps = WeightedIconProps | NonWeightedIconProps;

// ===================== 5) getIconKey 함수 =====================
function getIconKey(variant: string, weight?: "R" | "M" | "B"): IconKey {
  if (weight) return `Weight=${weight}.${variant}` as IconKey;
  return variant as IconKey;
}

export const LFIcon: React.FC<IconProps> = (props) => {
  const { variant, size = 24, color: _color } = props;
  const color = LFColor[_color];

  let iconKey;
  if ("weight" in props) {
    // WeightedIconProps
    iconKey = getIconKey(variant, props.weight);
  } else {
    // NonWeightedIconProps
    iconKey = getIconKey(variant);
  }

  const IconComponent = icons[iconKey as IconKey];
  if (!IconComponent) {
    throw new Error(`Icon not found for key="${iconKey}"`);
  }

  return (
    <div style={{ color }}>
      {/*<IconComponent width={30} height={40} />*/}
      <IconComponent width={size} height={size} />
    </div>
  );
};

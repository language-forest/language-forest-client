// --- Weight=R.* 파일들 ---
import WeightRXMark from "./raw/Weight=R.xMark.svg?component";
import WeightRSpeakerWaveFill from "./raw/Weight=R.speaker.wave.fill.svg?component";
import WeightRMic from "./raw/Weight=R.mic.svg?component";
import WeightRKeyboard from "./raw/Weight=R.keyboard.svg?component";
import WeightREllipsis from "./raw/Weight=R.ellipsis.svg?component";
import WeightRChevronUp from "./raw/Weight=R.chevron.up.svg?component";
import WeightRChevronRight from "./raw/Weight=R.chevron.right.svg?component";
import WeightRChevronLeft from "./raw/Weight=R.chevron.left.svg?component";
import WeightRChevronDown from "./raw/Weight=R.chevron.down.svg?component";
import WeightRCheck from "./raw/Weight=R.check.svg?component";
import WeightRCarrow2Circle from "./raw/Weight=R.carrow.2.circle.svg?component";
import WeightRArrowUp from "./raw/Weight=R.arrow.up.svg?component";
import WeightRArrowRight from "./raw/Weight=R.arrow.right.svg?component";
import WeightRArrowLeft from "./raw/Weight=R.arrow.left.svg?component";
import WeightRArrowDown from "./raw/Weight=R.arrow.down.svg?component";

// --- Weight=M.* 파일들 ---
import WeightMXMark from "./raw/Weight=M.xMark.svg?component";
import WeightMSpeakerWaveFill from "./raw/Weight=M.speaker.wave.fill.svg?component";
import WeightMMic from "./raw/Weight=M.mic.svg?component";
import WeightMKeyboard from "./raw/Weight=M.keyboard.svg?component";
import WeightMEllipsis from "./raw/Weight=M.ellipsis.svg?component";
import WeightMChevronUp from "./raw/Weight=M.chevron.up.svg?component";
import WeightMChevronRight from "./raw/Weight=M.chevron.right.svg?component";
import WeightMChevronLeft from "./raw/Weight=M.chevron.left.svg?component";
import WeightMChevronDown from "./raw/Weight=M.chevron.down.svg?component";
import WeightMCheck from "./raw/Weight=M.check.svg?component";
import WeightMCarrow2Circle from "./raw/Weight=M.carrow.2.circle.svg?component";
import WeightMArrowUp from "./raw/Weight=M.arrow.up.svg?component";
import WeightMArrowRight from "./raw/Weight=M.arrow.right.svg?component";
import WeightMArrowLeft from "./raw/Weight=M.arrow.left.svg?component";
import WeightMArrowDown from "./raw/Weight=M.arrow.down.svg?component";

// --- Weight=B.* 파일들 ---
import WeightBXMark from "./raw/Weight=B.xMark.svg?component";
import WeightBSpeakerWaveFill from "./raw/Weight=B.speaker.wave.fill.svg?component";
import WeightBMic from "./raw/Weight=B.mic.svg?component";
import WeightBKeyboard from "./raw/Weight=B.keyboard.svg?component";
import WeightBEllipsis from "./raw/Weight=B.ellipsis.svg?component";
import WeightBChevronUp from "./raw/Weight=B.chevron.up.svg?component";
import WeightBChevronRight from "./raw/Weight=B.chevron.right.svg?component";
import WeightBChevronLeft from "./raw/Weight=B.chevron.left.svg?component";
import WeightBChevronDown from "./raw/Weight=B.chevron.down.svg?component";
import WeightBCheck from "./raw/Weight=B.check.svg?component";
import WeightBCarrow2Circle from "./raw/Weight=B.carrow.2.circle.svg?component";
import WeightBArrowUp from "./raw/Weight=B.arrow.up.svg?component";
import WeightBArrowRight from "./raw/Weight=B.arrow.right.svg?component";
import WeightBArrowLeft from "./raw/Weight=B.arrow.left.svg?component";
import WeightBArrowDown from "./raw/Weight=B.arrow.down.svg?component";

// --- NonWeighted(Weight 없이 쓰는) 아이콘들 ---
import TopNavShop from "./raw/topNav.shop.svg?component";
import TopNavBell from "./raw/topNav.bell.svg?component";
import TopNavBellDot from "./raw/topNav.bell.dot.svg?component";
import BottomNavStar from "./raw/bottomNav.star.svg?component";
import BottomNavHome from "./raw/bottomNav.home.svg?component";
import BottomNavBook from "./raw/bottomNav.book.svg?component";

// ================== 2) Weighted / NonWeighted Variant 구분 ==================
/** (A) weight가 필요한 아이콘. (weight="R"|"M"|"B" 필수) */
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

/** (B) weight 사용 불가(=쓰면 에러) 아이콘 */
type NonWeightedVariant =
  | "topNav.shop"
  | "topNav.bell"
  | "topNav.bell.dot"
  | "bottomNav.star"
  | "bottomNav.home"
  | "bottomNav.book";

// ================== 3) icons Dictionary ==================
const icons = {
  // --- Weight=R.* ---
  "Weight=R.xMark": WeightRXMark,
  "Weight=R.speaker.wave.fill": WeightRSpeakerWaveFill,
  "Weight=R.mic": WeightRMic,
  "Weight=R.keyboard": WeightRKeyboard,
  "Weight=R.ellipsis": WeightREllipsis,
  "Weight=R.chevron.up": WeightRChevronUp,
  "Weight=R.chevron.right": WeightRChevronRight,
  "Weight=R.chevron.left": WeightRChevronLeft,
  "Weight=R.chevron.down": WeightRChevronDown,
  "Weight=R.check": WeightRCheck,
  "Weight=R.carrow.2.circle": WeightRCarrow2Circle,
  "Weight=R.arrow.up": WeightRArrowUp,
  "Weight=R.arrow.right": WeightRArrowRight,
  "Weight=R.arrow.left": WeightRArrowLeft,
  "Weight=R.arrow.down": WeightRArrowDown,

  // --- Weight=M.* ---
  "Weight=M.xMark": WeightMXMark,
  "Weight=M.speaker.wave.fill": WeightMSpeakerWaveFill,
  "Weight=M.mic": WeightMMic,
  "Weight=M.keyboard": WeightMKeyboard,
  "Weight=M.ellipsis": WeightMEllipsis,
  "Weight=M.chevron.up": WeightMChevronUp,
  "Weight=M.chevron.right": WeightMChevronRight,
  "Weight=M.chevron.left": WeightMChevronLeft,
  "Weight=M.chevron.down": WeightMChevronDown,
  "Weight=M.check": WeightMCheck,
  "Weight=M.carrow.2.circle": WeightMCarrow2Circle,
  "Weight=M.arrow.up": WeightMArrowUp,
  "Weight=M.arrow.right": WeightMArrowRight,
  "Weight=M.arrow.left": WeightMArrowLeft,
  "Weight=M.arrow.down": WeightMArrowDown,

  // --- Weight=B.* ---
  "Weight=B.xMark": WeightBXMark,
  "Weight=B.speaker.wave.fill": WeightBSpeakerWaveFill,
  "Weight=B.mic": WeightBMic,
  "Weight=B.keyboard": WeightBKeyboard,
  "Weight=B.ellipsis": WeightBEllipsis,
  "Weight=B.chevron.up": WeightBChevronUp,
  "Weight=B.chevron.right": WeightBChevronRight,
  "Weight=B.chevron.left": WeightBChevronLeft,
  "Weight=B.chevron.down": WeightBChevronDown,
  "Weight=B.check": WeightBCheck,
  "Weight=B.carrow.2.circle": WeightBCarrow2Circle,
  "Weight=B.arrow.up": WeightBArrowUp,
  "Weight=B.arrow.right": WeightBArrowRight,
  "Weight=B.arrow.left": WeightBArrowLeft,
  "Weight=B.arrow.down": WeightBArrowDown,

  // --- NonWeighted ---
  "topNav.shop": TopNavShop,
  "topNav.bell": TopNavBell,
  "topNav.bell.dot": TopNavBellDot,
  "bottomNav.star": BottomNavStar,
  "bottomNav.home": BottomNavHome,
  "bottomNav.book": BottomNavBook,
} as const;

type IconType = keyof typeof icons;

// ================== 4) Props 타입 정의 (유니온) ==================
interface WeightedIconProps extends React.SVGProps<SVGSVGElement> {
  variant: WeightedVariant;
  weight: "R" | "M" | "B"; // 필수
  size?: number; // <svg width/height>
}

interface NonWeightedIconProps extends React.SVGProps<SVGSVGElement> {
  variant: NonWeightedVariant;
  size?: number;
  // weight 주면 TS 에러
}

export type IconProps = WeightedIconProps | NonWeightedIconProps;

// ================== 5) key 생성 함수 ==================
function getIconKey(variant: string, weight?: "R" | "M" | "B"): IconType {
  if (weight) {
    return `Weight=${weight}.${variant}` as IconType;
  }
  return variant as IconType;
}

// ================== 6) LFIcon 컴포넌트 ==================
export const LFIcon: React.FC<IconProps> = (props) => {
  const { variant, size = 24, style, ...rest } = props;

  // Weighted vs NonWeighted 구분
  let iconKey: IconType;
  if ("weight" in props) {
    iconKey = getIconKey(variant, props.weight);
  } else {
    iconKey = getIconKey(variant);
  }
  console.log(iconKey);

  const IconComponent = icons[iconKey];
  if (!IconComponent) {
    throw new Error(`Icon not found for key="${iconKey}"`);
  }

  // style.color → SVG의 "currentColor"로 반영됨 (SVG 내부가 fill="currentColor" 인 경우)
  // size → <svg width={size} height={size}>
  return (
    <IconComponent
      width={size}
      height={size}
      style={{ color: style?.color, ...style }}
      {...rest}
    />
  );
};

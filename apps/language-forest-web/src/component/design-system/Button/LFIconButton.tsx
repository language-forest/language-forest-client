/** @jsxImportSource @emotion/react */
import { LFIcon, LFIconProps } from "@/component/design-system";

type LFIconButtonProps = {
  icon: LFIconProps;
  onClick: () => void;
};

export const LFIconButton = ({ icon, onClick }: LFIconButtonProps) => {
  return (
    <button css={{ padding: "10px" }} onClick={onClick}>
      <LFIcon {...icon} />
    </button>
  );
};

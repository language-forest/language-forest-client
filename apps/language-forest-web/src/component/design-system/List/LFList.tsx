import {
  HStack,
  LFIcon,
  LFIconProps,
  LFText,
  VStack,
} from "@/component/design-system";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { LFColor } from "@repo/shared/constant";

type LFListType = {
  prefixIcon?: LFIconProps;
  title: string;
  description?: string;
  onClick?: () => void;
};

type LFListProps = {
  list: Array<LFListType>;
};

export const LFList = ({ list }: LFListProps) => {
  return (
    <LFListContainer>
      {list.map((item) => {
        return (
          <LFListItem {...item} key={`${item.title}_${item.description}`} />
        );
      })}
    </LFListContainer>
  );
};

const LFListItem = ({
  prefixIcon,
  title,
  onClick,
  description,
}: LFListType) => {
  return (
    <LFListItemContainer onClick={onClick}>
      <HStack gap={12} alignItems={"center"}>
        {prefixIcon && (
          <HStack>
            <LFIcon {...prefixIcon} />
          </HStack>
        )}
        <VStack>
          <LFText variant={"headline"} weight={"M"} color={"ContentMainC"}>
            {title}
          </LFText>
          {description && (
            <LFText variant={"subHeadline"} weight={"R"} color={"RawGray70"}>
              {description}
            </LFText>
          )}
        </VStack>
      </HStack>

      <LFIcon
        variant={"chevron.right"}
        weight={"M"}
        color={"OpacityB30"}
        size={22}
      />
    </LFListItemContainer>
  );
};

const LFListContainer = styled(VStack)`
  background-color: ${LFColor.White};
  border-radius: 16px;
  //
  //
`;

const LFListItemContainer = styled(motion.button)`
  display: flex;

  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
`;

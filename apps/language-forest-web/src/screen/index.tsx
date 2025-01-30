import withAuth from "@/hoc/AuthHoc.tsx";
import {
  LFBottomTabNavigation,
  LFPageWrapper,
  LFHeader,
  LFHeaderHome,
  LFHeaderNotification,
  HStack,
  LFText,
  LFHugButton,
  VStack,
  LFIcon,
} from "@/component/design-system";
import { LFColor } from "@repo/shared/constant";
import { useLFNavigate } from "@/util/navigate/useLFNavigate.ts";
import styled from "@emotion/styled";

const IndexScreen = withAuth(
  () => {
    const { push } = useLFNavigate();
    return (
      <LFPageWrapper>
        <LFHeader left={<LFHeaderHome />} right={<LFHeaderNotification />} />

        <VStack
          style={{ flex: 1 }}
          alignItems={"center"}
          justifyContent={"center"}
          gap={"24px"}
        >
          <LFText
            variant={"title3"}
            weight={"B"}
            color={"LFGreen"}
            textAlign={"center"}
          >
            오늘은 회사에서
            <br />
            어떤 일을 하셨나요?
          </LFText>
          <LFIcon variant={"SooPooRy"} color={"LFGreen"} size={144} />
        </VStack>

        <VStack paddingHorizontal={20} paddingVertical={12}>
          <GoStudyContainer>
            <LFText
              variant={"body"}
              weight={"R"}
              color={"RawGray30"}
              whiteSpace={"pre-wrap"}
            >
              오늘 있었던 일을 기록하고 영어로 표현해봐요
            </LFText>

            <LFHugButton
              type={"White"}
              border={"Pill"}
              whiteSpace={"nowrap"}
              onClick={async () => {
                push({ path: "study" });
              }}
            >
              오늘의 표현
            </LFHugButton>
          </GoStudyContainer>
        </VStack>
        <LFBottomTabNavigation />
      </LFPageWrapper>
    );
  },
  {
    behavior: "bottomSheet",
    redirectTo: "login",
  },
);

const GoStudyContainer = styled(HStack)`
  background-color: ${LFColor.LFGreen};
  border-radius: 22px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  align-self: flex-end;
`;

export default IndexScreen;

import { FillButton, TempButton } from "@/component/design-system";
import { overlay } from "overlay-kit";
import { Alert } from "@/component/design-system/Modal";
import { LFText } from "@/component/design-system";
import { waitTimeout } from "@/util/waitTimeout.ts";

const IndexScreen = () => {
  return (
    <div>
      <LFText>test 스크린입니다</LFText>
      <FillButton
        type={"Line"}
        onClick={async () => {
          await waitTimeout(2000);
        }}
      >
        Line
      </FillButton>

      <FillButton
        type={"Green"}
        onClick={async () => {
          await waitTimeout(2000);
        }}
      >
        Green
      </FillButton>

      <FillButton
        type={"LightGreen"}
        onClick={async () => {
          await waitTimeout(2000);
        }}
      >
        LightGreen
      </FillButton>
      <TempButton
        text={"이버튼을 누르면 모달이 등장합니다"}
        onClick={() => {
          overlay.open(({ isOpen, close }) => {
            return (
              <Alert
                isOpen={isOpen}
                title={"test title입니다"}
                description={
                  "description입니다 esdas asdf. viasd foise jflaskdj foijv alsdjfoisej flsdjf "
                }
                onBackdropClick={close}
                bottomButtons={{
                  type: "double",
                  leftButton: {
                    onClick: () => console.log("llllllllllll"),
                    text: "왼",
                  },
                  rightButton: {
                    onClick: () => console.log("rrrrrrrr"),
                    text: "오른쪽",
                  },
                }}
              />
            );
          });
        }}
      />
    </div>
  );
};

export default IndexScreen;

import {
  FillButton,
  LFHeader,
  HugButton,
  InputField,
  LFIcon,
  Tooltip,
  Alert,
  LFText,
  Divider,
  HStack,
  BottomTabNavigation,
} from "@/component/design-system";
import { overlay } from "overlay-kit";
import { waitTimeout } from "@/util/waitTimeout.ts";

const IndexScreen = () => {
  return (
    <div>
      <LFHeader
        left={<div>llllllllllllllllllllll</div>}
        center={<div>cccccccccccccccccentercccccccccccccc</div>}
        right={<div>rrrrrrrrrrrrrrrrrrrrrrrrrrrrr</div>}
      />
      <LFText>test 스크린입니다 aaaaaaaaaaaaaaaaaaaaaa</LFText>
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

      <HStack>
        <HugButton
          type={"Ghost"}
          border={"Pill"}
          onClick={async () => {
            await waitTimeout(2000);
          }}
        >
          Ghost
        </HugButton>

        <HugButton
          type={"White"}
          border={"Pill"}
          onClick={async () => {
            await waitTimeout(2000);
          }}
        >
          White
        </HugButton>

        <HugButton
          type={"Green"}
          border={"Pill"}
          onClick={async () => {
            await waitTimeout(2000);
          }}
        >
          Green
        </HugButton>

        <HugButton
          type={"LightGreen"}
          border={"Pill"}
          onClick={async () => {
            await waitTimeout(2000);
          }}
        >
          LightGreen
        </HugButton>

        <HugButton
          type={"White"}
          border={"Square"}
          onClick={async () => {
            await waitTimeout(2000);
          }}
        >
          White
        </HugButton>

        <HugButton
          type={"Green"}
          border={"Square"}
          onClick={async () => {
            await waitTimeout(2000);
          }}
        >
          Green
        </HugButton>

        <HugButton
          type={"LightGreen"}
          border={"Square"}
          onClick={async () => {
            await waitTimeout(2000);
          }}
        >
          LightGreen
        </HugButton>
      </HStack>

      <FillButton
        type={"Green"}
        onClick={async () => {
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
      >
        모달열기jk
      </FillButton>
      <Divider height={8} backgroundColor={"White"} />
      <HStack>
        {/*<Tooltip label={"top"} position={"top"} />*/}
        {/*<Tooltip label={"bottom"} position={"bottom"} />*/}
        {/*<Tooltip label={"bottom-left"} position={"bottom-left"} />*/}
        {/*<Tooltip label={"top-left"} position={"top-left"} />*/}
        {/*<Tooltip label={"label"} position={"top-right"} />*/}
        {/*<Tooltip label={"label"} position={"bottom-left"} />*/}
        <Tooltip label={"bottom-right"} position={"bottom-right"} />
      </HStack>

      <InputField placeholder={"test"} maxLines={4} validate={() => true} />
      <InputField placeholder={"test"} maxLines={4} validate={() => false} />
      <InputField placeholder={"test"} />

      <LFIcon variant={"bottomNav.book"} size={20} color={"Red"} />

      <BottomTabNavigation />
    </div>
  );
};

export default IndexScreen;

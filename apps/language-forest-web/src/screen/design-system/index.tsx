import {
  LFFillButton,
  LFHeader,
  LFHugButton,
  LFInputField,
  LFIcon,
  Tooltip,
  Alert,
  LFText,
  Divider,
  HStack,
  BottomTabNavigation,
  SegmentControl,
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
      <LFFillButton
        type={"Line"}
        onClick={async () => {
          await waitTimeout(2000);
        }}
      >
        Line
      </LFFillButton>

      <LFFillButton
        type={"Green"}
        onClick={async () => {
          await waitTimeout(2000);
        }}
      >
        Green
      </LFFillButton>

      <LFFillButton
        type={"LightGreen"}
        onClick={async () => {
          await waitTimeout(2000);
        }}
      >
        LightGreen
      </LFFillButton>

      <HStack>
        <LFHugButton
          type={"Ghost"}
          border={"Pill"}
          onClick={async () => {
            await waitTimeout(2000);
          }}
        >
          Ghost
        </LFHugButton>

        <LFHugButton
          type={"White"}
          border={"Pill"}
          onClick={async () => {
            await waitTimeout(2000);
          }}
        >
          White
        </LFHugButton>

        <LFHugButton
          type={"Green"}
          border={"Pill"}
          onClick={async () => {
            await waitTimeout(2000);
          }}
        >
          Green
        </LFHugButton>

        <LFHugButton
          type={"LightGreen"}
          border={"Pill"}
          onClick={async () => {
            await waitTimeout(2000);
          }}
        >
          LightGreen
        </LFHugButton>

        <LFHugButton
          type={"White"}
          border={"Square"}
          onClick={async () => {
            await waitTimeout(2000);
          }}
        >
          White
        </LFHugButton>

        <LFHugButton
          type={"Green"}
          border={"Square"}
          onClick={async () => {
            await waitTimeout(2000);
          }}
        >
          Green
        </LFHugButton>

        <LFHugButton
          type={"LightGreen"}
          border={"Square"}
          onClick={async () => {
            await waitTimeout(2000);
          }}
        >
          LightGreen
        </LFHugButton>
      </HStack>

      <LFFillButton
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
      </LFFillButton>
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

      <LFInputField placeholder={"test"} maxLines={4} validate={() => true} />
      <LFInputField placeholder={"test"} maxLines={4} validate={() => false} />
      <LFInputField placeholder={"test"} />

      <LFIcon variant={"bottomNav.book"} size={20} color={"Red"} />

      <SegmentControl
        name={"test"}
        segments={[
          { label: "111111111", value: "1" },
          { label: "2222222222", value: "2" },
        ]}
        callback={(e) => console.log(e)}
      />

      <BottomTabNavigation />
    </div>
  );
};

export default IndexScreen;

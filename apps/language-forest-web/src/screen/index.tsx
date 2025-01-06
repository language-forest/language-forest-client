import { TempButton, TempBottomSheet } from "../component/design-system";
import { overlay } from "overlay-kit";
import { TempModal } from "../component/design-system/Modal";

const IndexScreen = () => {
  return (
    <div>
      test 스크린입니다
      <TempButton
        text={"이버튼을 누르면 바텀시트가 등장합니다"}
        onClick={() => {
          overlay.open(({ isOpen, close }) => {
            return (
              <TempBottomSheet isOpen={isOpen} onClose={close}>
                <TempButton text={"test"} />
              </TempBottomSheet>
            );
          });
        }}
      />
      <TempButton
        text={"이버튼을 누르면 모달이 등장합니다"}
        onClick={() => {
          overlay.open(({ isOpen, close }) => {
            return (
              <TempModal isOpen={isOpen} onClose={close}>
                <TempButton text={"test"} />
              </TempModal>
            );
          });
        }}
      />
    </div>
  );
};

export default IndexScreen;

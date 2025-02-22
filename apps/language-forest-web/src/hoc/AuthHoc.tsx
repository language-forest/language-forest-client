import { useEffect } from "react";
import { overlay } from "overlay-kit";
import { Alert, BottomSheet, LFText } from "@/component/design-system";
import { LoadingStatusEnum, useUserStore } from "@/store/useUserStore.ts";
import { PathKey, useLFNavigate } from "@/util/navigate/useLFNavigate.ts";

export type WithBehaviorOptions = {
  behavior: "redirect" | "bottomSheet" | "modal"; // 세 가지 시나리오
  redirectTo?: PathKey; // redirect 시 이동할 경로
};

/**
 * HOC: withBehavior
 * @param WrappedComponent - 원본 컴포넌트
 * @param options - HOC 옵션 (behavior, redirectTo 등)
 */
function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithBehaviorOptions,
) {
  const { behavior, redirectTo } = options;

  const EnhancedComponent: React.FC<P> = (props) => {
    const { replace, back } = useLFNavigate();
    const { getIsLoggedIn, loadingStatus } = useUserStore();
    const isLoggedIn = getIsLoggedIn();

    useEffect(() => {
      if (
        loadingStatus === LoadingStatusEnum.loading ||
        loadingStatus === LoadingStatusEnum.init
      ) {
        return;
      }
      if (isLoggedIn) {
        return;
      }

      if (behavior === "redirect" && redirectTo) {
        replace({ path: redirectTo });
      }

      const handleOutsideClick = () => {
        if (redirectTo) {
          return replace({ path: redirectTo });
        }

        back();
      };

      if (behavior === "bottomSheet") {
        overlay.open(({ isOpen, close }) => {
          return (
            <BottomSheet
              isOpen={isOpen}
              onClose={() => {
                close();
                handleOutsideClick();
              }}
            >
              <LFText variant={"headline"} weight={"B"}>
                로그인 이후 사용 가능합니다.
              </LFText>
              <br />
              <LFText variant={"headline"}>로그인 화면으로 전환됩니다.</LFText>
            </BottomSheet>
          );
        });
        return;
      }

      if (behavior === "modal") {
        overlay.open(({ isOpen, close }) => {
          return (
            <Alert
              isOpen={isOpen}
              title={"test title입니다"}
              description={"ㅐㅍㄷ기묘"}
              onBackdropClick={() => {
                close();
                handleOutsideClick();
              }}
              bottomButtons={{
                type: "double",
                leftButton: {
                  onClick: () => console.info("llllllllllll"),
                  text: "왼",
                },
                rightButton: {
                  onClick: () => console.info("rrrrrrrr"),
                  text: "오른쪽",
                },
              }}
            />
          );
        });
        return;
      }
    }, [behavior, redirectTo, isLoggedIn, loadingStatus]);

    if (isLoggedIn) {
      return <WrappedComponent {...props} />;
    }

    if (behavior === "redirect") {
      return;
    }

    return <WrappedComponent {...props} />;
  };

  return EnhancedComponent;
}

export default withAuth;

import { useEffect } from "react";
import { overlay } from "overlay-kit";
import { Alert, BottomSheet } from "@/component/design-system";
import { useUserStore } from "@/store/useUserStore.ts";
import { useLFNavigate } from "@/util/navigate/useLFNavigate.ts";

export type WithBehaviorOptions = {
  behavior: "redirect" | "bottomSheet" | "modal"; // 세 가지 시나리오
  redirectTo?: string; // redirect 시 이동할 경로
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
    const { getIsLoggedIn } = useUserStore();
    const isLoggedIn = getIsLoggedIn();

    useEffect(() => {
      if (isLoggedIn) {
        return;
      }

      if (behavior === "redirect" && redirectTo) {
        replace(redirectTo);
      }

      const handleOutsideClick = () => {
        if (redirectTo) {
          return replace(redirectTo);
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
              로그인 안돼서 못봐용
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
    }, [behavior, redirectTo, isLoggedIn]);

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

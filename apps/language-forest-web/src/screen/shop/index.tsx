import withAuth from "@/hoc/AuthHoc.tsx";
import {
  GlobalContainer,
  LFHeader,
  LFHeaderGoBack,
  LFHeaderTitle,
  LFText,
} from "@/component/design-system";

const ShopScreen = withAuth(
  () => {
    return (
      <GlobalContainer>
        <LFHeader
          left={<LFHeaderGoBack />}
          center={<LFHeaderTitle title={"샵"} />}
        />

        <LFText
          variant={"title3"}
          weight={"B"}
          color={"ContentMainC"}
          textAlign={"center"}
        >
          오픈 중비 중이에요
          <br />
          샵에서 씨앗을 사용할 수 있어요!
        </LFText>
      </GlobalContainer>
    );
  },
  {
    behavior: "bottomSheet",
    redirectTo: "login",
  },
);

export default ShopScreen;

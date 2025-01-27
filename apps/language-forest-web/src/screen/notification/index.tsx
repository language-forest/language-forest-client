import withAuth from "@/hoc/AuthHoc.tsx";
import {
  GlobalContainer,
  LFHeader,
  LFHeaderGoBack,
  LFHeaderTitle,
  LFText,
} from "@/component/design-system";

const NotificationScreen = withAuth(
  () => {
    return (
      <GlobalContainer>
        <LFHeader
          left={<LFHeaderGoBack />}
          center={<LFHeaderTitle title={"알림"} />}
        />
        넣을 예정 근데 여기 알람 설정 같은거 관리해야할 것 가틍ㄴ데 그거까지
        이야기해서 하기로
        {/*<LFText*/}
        {/*  variant={"title3"}*/}
        {/*  weight={"B"}*/}
        {/*  color={"ContentMainC"}*/}
        {/*  textAlign={"center"}*/}
        {/*>*/}
        {/*  오픈 중비 중이에요*/}
        {/*  <br />*/}
        {/*  샵에서 씨앗을 사용할 수 있어요!*/}
        {/*</LFText>*/}
      </GlobalContainer>
    );
  },
  {
    behavior: "bottomSheet",
    redirectTo: "/login",
  },
);

export default NotificationScreen;

import withAuth from "@/hoc/AuthHoc.tsx";
import {
  LFBottomTabNavigation,
  GlobalContainer,
  LFHeader,
  LFHeaderHome,
  LFHeaderNotification,
} from "@/component/design-system";

const IndexScreen = withAuth(
  () => {
    return (
      <GlobalContainer>
        <LFHeader left={<LFHeaderHome />} right={<LFHeaderNotification />} />

        <LFBottomTabNavigation />
      </GlobalContainer>
    );
  },
  {
    behavior: "bottomSheet",
    redirectTo: "login",
  },
);

export default IndexScreen;

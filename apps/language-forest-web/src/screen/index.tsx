import withAuth from "@/hoc/AuthHoc.tsx";
import {
  LFBottomTabNavigation,
  GlobalContainer,
  LFHeader,
} from "@/component/design-system";

const IndexScreen = withAuth(
  () => {
    return (
      <GlobalContainer>
        <LFHeader />

        <LFBottomTabNavigation />
      </GlobalContainer>
    );
  },
  {
    behavior: "bottomSheet",
    redirectTo: "/login",
  },
);

export default IndexScreen;

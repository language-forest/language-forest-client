import {
  createBrowserRouter,
  RouterProvider,
  LoaderFunction,
  ActionFunction,
} from "react-router-dom";
import ReactQueryProviders from "@repo/language-forest-api/QueryProvider";
import { useAsyncEffect } from "./hook/useAsyncEffect.ts";
import { useUserStore } from "./store/useUserStore.ts";
import { OverlayProvider } from "overlay-kit";
import styled from "@emotion/styled";
import { LFColor } from "@repo/shared/constant";

interface RouteCommon {
  loader?: LoaderFunction;
  action?: ActionFunction;
  ErrorBoundary?: React.ComponentType<unknown>;
}

interface IRoute extends RouteCommon {
  path: string;
  Element: React.ComponentType<unknown>;
}

interface Screen {
  [key: string]: {
    default: React.ComponentType<unknown>;
  } & RouteCommon;
}

const screens: Screen = import.meta.glob("./screen/**/*.tsx", { eager: true });
const routes: IRoute[] = [];
for (const path of Object.keys(screens)) {
  const fileName = path.match(/\.\/screen\/(.*)\.tsx$/)?.[1];
  if (!fileName) {
    continue;
  }
  if (fileName.startsWith("_")) {
    continue;
  }

  const normalizedPathName = fileName
    .replace(/\$/g, ":") // 모든 $를 :로 변환
    .replace(/\/index$/, "");

  routes.push({
    path: fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`,
    Element: screens[path]?.default,
    loader: screens[path]?.loader as LoaderFunction | undefined,
    action: screens[path]?.action as ActionFunction | undefined,
    // ErrorBoundary: screens[path]?.ErrorBoundary,
  });
}

const router = createBrowserRouter(
  routes.map(({ Element, ErrorBoundary, ...rest }) => ({
    ...rest,
    element: Element ? <Element /> : null,
    ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
  })),
  {
    basename: "/",
  },
);

const App = () => {
  const { init } = useUserStore();
  useAsyncEffect(async () => {
    await init();
  }, []);

  return (
    <GlobalOuterContainer>
      <GlobalInnerContainer>
        <ReactQueryProviders>
          <OverlayProvider>
            <RouterProvider router={router} />
          </OverlayProvider>
        </ReactQueryProviders>
      </GlobalInnerContainer>
    </GlobalOuterContainer>
  );
};

const GlobalOuterContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${LFColor.White};
  height: 100vh;
`;

const GlobalInnerContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: ${LFColor.Background};
`;

export default App;

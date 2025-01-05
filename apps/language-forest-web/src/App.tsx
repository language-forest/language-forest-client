import {
  createBrowserRouter,
  RouterProvider,
  LoaderFunction,
  ActionFunction,
} from "react-router-dom";
import ReactQueryProviders from "@repo/language-forest-api/QueryProvider";

interface RouteCommon {
  loader?: LoaderFunction;
  action?: ActionFunction;
  ErrorBoundary?: React.ComponentType<any>;
}

interface IRoute extends RouteCommon {
  path: string;
  Element: React.ComponentType<any>;
}

interface Screen {
  [key: string]: {
    default: React.ComponentType<any>;
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

  const normalizedPathName = fileName.includes("$")
    ? //   파일을 $id.tsx이런식으로하면 path를 지정할 수 있다.
      fileName.replace("$", ":")
    : fileName.replace(/\/index/, "");

  routes.push({
    path: fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`,
    Element: screens[path]?.default!,
    loader: screens[path]?.loader as LoaderFunction | undefined,
    action: screens[path]?.action as ActionFunction | undefined,
    // ErrorBoundary: screens[path]?.ErrorBoundary,
  });
}

const router = createBrowserRouter(
  routes.map(({ Element, ErrorBoundary, ...rest }) => ({
    ...rest,
    element: <Element />,
    ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
  })),
);

const App = () => {
  return (
    <ReactQueryProviders>
      <RouterProvider router={router} />;
    </ReactQueryProviders>
  );
};

export default App;

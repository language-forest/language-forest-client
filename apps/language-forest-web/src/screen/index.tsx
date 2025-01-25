import withAuth from "@/hoc/AuthHoc.tsx";

const IndexScreen = withAuth(
  () => {
    return <div>index</div>;
  },
  {
    behavior: "bottomSheet",
    redirectTo: "/login",
  },
);

export default IndexScreen;

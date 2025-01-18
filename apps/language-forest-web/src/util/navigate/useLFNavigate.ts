import { useNavigate } from "react-router-dom";

export const useLFNavigate = () => {
  const navigate = useNavigate();
  return {
    push: (path: string) => {
      navigate(path);
    },
    replace: (path: string) => {
      navigate(path, { replace: true });
    },
    back: () => {
      navigate(-1);
    },
  };
};

import { useEffect } from "react";

export const useDisableScroll = () => {
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.classList.add("disable-body-scroll");
    document.body.style.top = `-${scrollY}px`;

    return () => {
      document.body.classList.remove("disable-body-scroll");
      const scrollY = parseInt(document.body.style.top || "0", 10);
      document.body.style.top = "";
      window.scrollTo(0, -scrollY);
    };
  }, []);
};

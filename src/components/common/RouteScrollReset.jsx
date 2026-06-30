import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function RouteScrollReset() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) {
      return undefined;
    }

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    window.scrollTo({ behavior: "auto", left: 0, top: 0 });
  }, [pathname]);

  return null;
}

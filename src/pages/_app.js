import "../styles/base.css";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const basePath = "/election-guide-2024"; // Setting the base path

  useEffect(() => {
    const handleRouteChangeStart = () => {
      const currentPath = router.asPath.startsWith(basePath) 
        ? router.asPath 
        : `${basePath}${router.asPath}`;
      sessionStorage.setItem(currentPath, window.scrollY.toString());
    };

    const handleRouteChangeComplete = (url) => {
      // Use setTimeout to ensure the DOM has updated
      setTimeout(() => {
        const currentPath = url.startsWith(basePath) ? url : `${basePath}${url}`;
        const savedPosition = sessionStorage.getItem(currentPath);
        if (savedPosition) {
          window.scrollTo(0, parseInt(savedPosition, 10));
        }
      }, 0);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router, basePath]);

  return <Component {...pageProps} />;
}

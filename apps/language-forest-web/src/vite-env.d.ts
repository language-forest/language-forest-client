/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

// 1. 기본 *.svg 모듈 (문자열 URL)
declare module "*.svg" {
  const src: string;
  export default src;
}

// 2. ?component 쿼리가 붙은 *.svg 모듈 (React 컴포넌트)
declare module "*.svg?component" {
  import * as React from "react";
  const Component: React.FC<React.SVGProps<SVGSVGElement>>;
  export default Component;
}

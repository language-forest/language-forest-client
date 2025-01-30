import { CSSProperties } from "react";

type LFImageProps = {
  src: string;
  alt: string;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  style?: CSSProperties;
  borderRadius?: CSSProperties["borderRadius"];
};

export const LFImage = ({
  src,
  alt,
  width,
  height,
  style,
  borderRadius,
}: LFImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{ borderRadius, ...style }}
    />
  );
};

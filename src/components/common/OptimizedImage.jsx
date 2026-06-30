import { useEffect, useMemo, useState } from "react";

const DEFAULT_IMAGE_FALLBACK = "/images/menu/placeholder.jpg";

export default function OptimizedImage({
  alt,
  className = "",
  decoding = "async",
  fallbackSrc,
  height,
  loading = "lazy",
  src,
  width,
  ...props
}) {
  const initialSrc = useMemo(
    () => src || fallbackSrc || DEFAULT_IMAGE_FALLBACK,
    [fallbackSrc, src]
  );
  const [currentSrc, setCurrentSrc] = useState(initialSrc);

  useEffect(() => {
    setCurrentSrc(initialSrc);
  }, [initialSrc]);

  const handleError = () => {
    setCurrentSrc((previousSrc) => {
      if (fallbackSrc && previousSrc !== fallbackSrc) {
        return fallbackSrc;
      }

      if (previousSrc !== DEFAULT_IMAGE_FALLBACK) {
        return DEFAULT_IMAGE_FALLBACK;
      }

      return "";
    });
  };

  return (
    <img
      alt={alt}
      className={["optimized-image", className].filter(Boolean).join(" ")}
      decoding={decoding}
      draggable={false}
      height={height}
      loading={loading}
      onError={handleError}
      src={currentSrc || undefined}
      width={width}
      {...props}
    />
  );
}

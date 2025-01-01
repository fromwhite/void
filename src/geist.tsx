export const Loader = ({ size = 24, color = "currentColor", style = {} }) => (
  <svg
    fill="none"
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    shapeRendering="geometricPrecision"
    viewBox="0 0 24 24"
    height={size}
    width={size}
    style={{ color, ...style }}
  >
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
  </svg>
);

export const X = ({ size = 24, color = "currentColor", style = {} }) => (
  <svg
    fill="none"
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    shapeRendering="geometricPrecision"
    viewBox="0 0 24 24"
    height={size}
    width={size}
    style={{ color, ...style }}
  >
    <path d="M18 6L6 18M6 6l12 12"></path>
  </svg>
);

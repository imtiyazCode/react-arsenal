import React from "react";
import "./Skeleton.css";

type SkeletonVariant = "text" | "circular" | "rectangular" | "card";

interface ISkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

const toPx = (value: string | number | undefined): string | undefined => {
  if (value === undefined) return undefined;
  return typeof value === "number" ? `${value}px` : value;
};

const Skeleton: React.FC<ISkeletonProps> = ({
  variant = "text",
  width,
  height,
  borderRadius,
  className = "",
  style = {},
}) => {
  const classes = ["skeleton", `skeleton--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  const inlineStyle: React.CSSProperties = {
    ...style,
    ...(width !== undefined ? { width: toPx(width) } : {}),
    ...(height !== undefined ? { height: toPx(height) } : {}),
    ...(borderRadius !== undefined ? { borderRadius: toPx(borderRadius) } : {}),
  };

  return <div className={classes} style={inlineStyle} aria-hidden="true" />;
};

export default Skeleton;

"use client";

import { BorderBeam } from "border-beam";

export default function BeamSurface({
  children,
  className = "",
  active = true,
  size = "md",
  strength = 0.48,
  duration = 4.8,
  borderRadius = 26,
}) {
  return (
    <BorderBeam
      size={size}
      colorVariant="ocean"
      theme="auto"
      strength={strength}
      duration={duration}
      staticColors
      active={active}
      borderRadius={borderRadius}
      className="w-full"
    >
      <div className={`relative ${className}`}>{children}</div>
    </BorderBeam>
  );
}

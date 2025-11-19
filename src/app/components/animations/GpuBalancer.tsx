"use client";

export default function GpuBalancer() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        opacity: 0,
        pointerEvents: "none",
        transform: "translateZ(0)",
        willChange: "transform",
      }}
    />
  );
}

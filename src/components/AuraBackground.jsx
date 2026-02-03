// src/components/AuraBackground.jsx
import React from "react";
import "./AuraBackground.css";

export default function AuraBackground() {
  return (
    <div className="aura-bg" aria-hidden="true">
      {/* more bubbles */}
      <div className="aura-bg__blob aura-bg__blob--a" />
      <div className="aura-bg__blob aura-bg__blob--b" />
      <div className="aura-bg__blob aura-bg__blob--c" />
      <div className="aura-bg__blob aura-bg__blob--d" />
      <div className="aura-bg__blob aura-bg__blob--e" />

      <div className="aura-bg__grain" />
      <div className="aura-bg__vignette" />
    </div>
  );
}

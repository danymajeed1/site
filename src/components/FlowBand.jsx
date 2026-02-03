// src/components/FlowBand.jsx
import React from "react";
import FlowBackground from "./FlowBackground";
import "./FlowBand.css";

export default function FlowBand({ children, className = "" }) {
  return (
    <section className={`flowband ${className}`}>
      <div className="flowband__bg" aria-hidden="true">
        <FlowBackground />
      </div>

      <div className="flowband__content">{children}</div>
    </section>
  );
}

// src/components/FlowBand.jsx
import React from "react";
import "./FlowBand.css";

export default function FlowBand({ children, className = "" }) {
  return (
    <section className={`flowband ${className}`}>
      {/* We removed the duplicate, stretched FlowBackground from here! */}
      <div className="flowband__content">{children}</div>
    </section>
  );
}
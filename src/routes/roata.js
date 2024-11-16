import React, { useState, useEffect } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
// import "../css/roata.scss";
import "../css/roata.css";
import Persoane from "../Persoane.json";

export default function Roata() {
  const items = Persoane.length;

  /*
JavaScript only required for spin interaction, not for rendering the component.
*/

  function wheelOfFortune(selector) {
    const node = document.querySelector(selector);
    if (!node) return;

    const spin = node.querySelector("button");
    const wheel = node.querySelector("ul");
    let animation;
    let previousEndDegree = 0;

    spin.addEventListener("click", () => {
      if (animation) {
        animation.cancel(); // Reset the animation if it already exists
      }

      const randomAdditionalDegrees = Math.random() * 360 + 1800;
      const newEndDegree = previousEndDegree + randomAdditionalDegrees;

      animation = wheel.animate(
        [
          { transform: `rotate(${previousEndDegree}deg)` },
          { transform: `rotate(${newEndDegree}deg)` },
        ],
        {
          duration: 16000,
          direction: "normal",
          easing: "cubic-bezier(0.440, -0.205, 0.000, 1.130)",
          fill: "forwards",
          iterations: 1,
        }
      );

      previousEndDegree = newEndDegree;
    });
  }

  // Usage
  useEffect(() => {
    wheelOfFortune(".ui-wheel-of-fortune");
  }, []);

  return (
    <section style={{ display: "flex", justifyContent: "center" }}>
      <fieldset className="ui-wheel-of-fortune" style={{ "--_items": items }}>
        <ul>
          {Persoane.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
        </ul>
        <button className="spin-btn" type="button">SPIN</button>
      </fieldset>
    </section>
  );
}

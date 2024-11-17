import React, { useState, useEffect } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
// import "../css/roata.scss";
import "../css/roata.css";
import Persoane from "../Persoane.json";
import Modal from "../components/Modal";

export default function Roata() {
  const items = Persoane.length;

  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState();
  const [modal, setModal] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);

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

      const normalizeAngle = (finalAngle) => {
        return (360 - finalAngle + 90) % 360;
      };

      const segment = 360 / items;
      const offset = 15;
      animation.animationstart = () => {
        setSpinning(true);
      };

      animation.onfinish = () => {
        const finalAngle = newEndDegree % 360;
        const normalizedAngle = normalizeAngle(finalAngle);
        const winner = Math.floor(((normalizedAngle + offset) % 360) / segment);

        setSpinning(false);
        setModal(true);
        setWinner(winner);
      };
    });
  }

  // Usage
  useEffect(() => {
    wheelOfFortune(".ui-wheel-of-fortune");
  }, []);
  useEffect(() => {
    if (totalVotes === 0) {
      Persoane.forEach((i) => {
        setTotalVotes(totalVotes + i.votes)
      });
    }

  });

  // totalPercent - 100% * items
  //              - totalVotes *

  //              360 votes - items * 100%
  //              50 votes - x
  //              x = 50 * (12 * 100) / totalVotes

  //      360 votes - items
  ///     50 votes - 

  //  6 items - 6 ix
  //  

  Persoane.map((item, index) => {
    console.log("!111!!");
    console.log(totalVotes);
    console.log(items * 100);
    console.log(item.votes);
  });

  return (
    <section style={{ display: "flex", justifyContent: "center" }}>
      <fieldset className="ui-wheel-of-fortune" style={{ "--_items": items }}>
        <ul>
          {Persoane.map((item, index) => (
            <li
              style={{
                // "clip-path": `polygon(0% 0%, 100% 50%, 0% ${
                //   (totalVotes * (items * 100)) / item.votes
                // }%)`,
                // aspectRatio: `${((totalVotes * (items * 1)) / item.votes)} / calc(2 * tan(180deg / var(--_items)))`
              }}
              key={index}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <button
          onClick={() => setSpinning(true)}
          disabled={spinning}
          className="spin-btn"
          type="button"
        >
          SPIN
        </button>
      </fieldset>
      <Modal open={modal} setOpen={setModal} winner={winner} />
    </section>
  );
}

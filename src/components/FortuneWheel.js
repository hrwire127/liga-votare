import React, { useState, useEffect } from "react";
import "../css/FortuneWheel.css";
import Modal from "./Modal";

const FortuneWheel = ({ data }) => {
  const [currentRotation, setCurrentRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [bgcolor, setBgcolor] = useState();

  const totalVotes = data.reduce((sum, item) => sum + item.votes, 0);

  let angleStart = 0;
  const gradientStops = data.map((item) => {
    const sliceAngle = (item.votes / totalVotes) * 360;
    const color = `hsl(${Math.random() * 360}, 70%, 60%)`;
    const stop = `${color} ${angleStart}deg ${angleStart + sliceAngle}deg`;
    angleStart += sliceAngle;
    return {
      stop,
      startAngle: angleStart - sliceAngle,
      endAngle: angleStart,
      color,
      ...item,
    };
  });

  const handleSpin = () => {
    if (isSpinning) return; // Prevent double spins

    setIsSpinning(true);
    const randomSpins = Math.floor(Math.random() * 3) + 5; // 5-7 full spins
    const randomOffset = Math.random() * 360; // Random final position
    const targetRotation = randomSpins * 360 + randomOffset;

    const newRotation = currentRotation + targetRotation;

    // Calculate final result
    const normalizedAngle = ((newRotation % 360) + 360) % 360;
    const selectedSlice = gradientStops.find(
      ({ startAngle, endAngle }) =>
        normalizedAngle >= startAngle && normalizedAngle < endAngle
    );

    // Set rotation and result with timeout for animation
    setCurrentRotation(newRotation);
    setTimeout(() => {
      setOpenModal(true);
      setResult(selectedSlice);
      setIsSpinning(false);
    }, 4500); // Animation duration matches transition
  };

  useEffect(() => {
    setBgcolor(
      `conic-gradient(${gradientStops.map((g) => g.stop).join(", ")})`
    );
  }, []);

  return (
    <section className="total">
      <div className="wheel-container">
        <div className="pointer"></div>
        <div
          className="wheel"
          style={{
            background: bgcolor,
            transform: `rotate(${currentRotation}deg)`,
            transition: "transform 4.5s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        >
          {gradientStops.map(({ name, startAngle, endAngle }) => (
            <div
              key={name}
              className="slice-label"
              style={{
                color: "black",
                transform: `rotate(${
                  startAngle + (endAngle - startAngle) / 2
                }deg) translate(-0%, -0%)`,
                writingMode: "vertical-rl",
              }}
            >
              {name}
            </div>
          ))}
        </div>
        <button
          className="spin-button"
          onClick={handleSpin}
          disabled={isSpinning}
        >
          Spin
        </button>

        <Modal setOpen={setOpenModal} open={openModal} winner={result} />
      </div>
    </section>
  );
};

export default FortuneWheel;

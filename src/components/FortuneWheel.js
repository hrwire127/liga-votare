import React, { useState } from "react";
import "../css/FortuneWheel.css";
import Modal from "../components/Modal";

const FortuneWheel = ({ data }) => {
  const [currentRotation, setCurrentRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const totalVotes = data.reduce((sum, item) => sum + item.votes, 0);

  // Calculate slices with proportional angles
  let angleStart = 0;
  const slices = data.map((item) => {
    const sliceAngle = (item.votes / totalVotes) * 360;
    const startAngle = angleStart;
    angleStart += sliceAngle;
    return { ...item, sliceAngle, startAngle };
  });

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const randomSpins = Math.floor(Math.random() * 3) + 5; // Random spins (5-7 full)
    const randomOffset = Math.random() * 360; // Random final angle
    const targetRotation = randomSpins * 360 + randomOffset;

    const newRotation = currentRotation + targetRotation;

    const normalizedAngle = ((newRotation % 360) + 360) % 360;
    const selectedSlice = slices.find(
      ({ startAngle, sliceAngle }) =>
        normalizedAngle >= startAngle &&
        normalizedAngle < startAngle + sliceAngle
    );

    setCurrentRotation(newRotation);
    setTimeout(() => {
      setResult(selectedSlice);
      setIsSpinning(false);
      setOpenModal(true);
    }, 4500);
  };

  return (
    <section className="section-wheel">
      <div className="wheel-container">
        <div className="pointer"></div>

        <svg
          className="wheel"
          viewBox="0 0 200 200"
          style={{
            transform: `rotate(${currentRotation}deg)`,
            transition: "transform 4.5s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        >
          {slices.map(({ name, startAngle, sliceAngle }, index) => {
            const endAngle = startAngle + sliceAngle;
            const largeArc = sliceAngle > 180 ? 1 : 0;

            const x1 = 100 + 100 * Math.cos((startAngle * Math.PI) / 180);
            const y1 = 100 - 100 * Math.sin((startAngle * Math.PI) / 180);

            const x2 = 100 + 100 * Math.cos((endAngle * Math.PI) / 180);
            const y2 = 100 - 100 * Math.sin((endAngle * Math.PI) / 180);

            const textAngle = startAngle + sliceAngle / 2; // Middle angle of the slice
            const textRadius = 70; // Position text closer to the center
            const textX =
              100 + textRadius * Math.cos((textAngle * Math.PI) / 180);
            const textY =
              100 - textRadius * Math.sin((textAngle * Math.PI) / 180);

            // Define path for slice
            const pathId = `slicePath-${index}`;

            return (
              <g key={index}>
                {/* Draw slice */}
                <path
                  id={pathId}
                  d={`M 100 100 L ${x1} ${y1} A 100 100 0 ${largeArc} 0 ${x2} ${y2} Z`}
                  fill={`hsl(${(index * 360) / slices.length}, 80%, 60%)`}
                />
                {/* Draw text */}
                <text
                  fill="white"
                  fontSize="4"
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${textAngle - 90} ${textX} ${textY})`} // Rotate text toward the center
                  x={textX}
                  y={textY}
                >
                  {name}
                </text>
              </g>
            );
          })}
        </svg>

        <button
          className="spin-button"
          onClick={handleSpin}
          disabled={isSpinning}
        >
          Spin
        </button>
        {<Modal open={openModal} setOpen={setOpenModal} winner={result} />}
      </div>
    </section>
  );
};

export default FortuneWheel;

"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export function Logo() {
  const [winkingEye, setWinkingEye] = useState<"left" | "right" | null>(null);

  const handleHover = () => {
    // Randomly select which eye to wink
    const eye = Math.random() < 0.5 ? "left" : "right";
    setWinkingEye(eye);
  };

  const handleHoverEnd = () => setWinkingEye(null);

  // Wink Animation
  const getEyeScale = (eyeType: "left" | "right") =>
    winkingEye === eyeType ? 0.2 : 1;

  const winkTransition = {
    duration: 0.15,
    ease: "easeInOut" as const,
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        rotate: -3,
      }}
      onHoverStart={handleHover}
      onHoverEnd={handleHoverEnd}
    >
      <svg
        width="52"
        height="69"
        viewBox="0 0 52 69"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.692 40.3703L10.2597 32.2863C10.2398 31.914 10.4357 31.5635 10.7631 31.3852L17.3498 27.7992C17.3498 27.7992 6.53574 35.7421 2.77406 27.9668C1.69724 25.7411 1.71165 23.098 2.43151 20.7326C5.62802 10.229 17.8173 11.1556 20.4088 11.4775C20.7182 11.516 21.0146 11.429 21.2425 11.2163C23.8609 8.77276 40.6007 -6.05048 48.2137 6.89766C48.8637 8.00327 49.2253 9.27849 49.2908 10.5594C49.9121 22.7106 38.2345 23.1183 38.2345 23.1183L41.5082 22.6315C42.0449 22.5517 42.5423 22.929 42.61 23.4675L44.3847 37.5809L45.9043 55.869C45.9113 55.9527 45.9076 56.036 45.8887 56.1179C45.6175 57.297 43.0106 66.5803 28.077 67.1018C14.6048 67.5722 11.5949 58.3156 11.3045 57.2954C11.2864 57.2319 11.2787 57.1713 11.2764 57.1052L10.692 40.3703Z"
          stroke="#2EC4B6"
          strokeWidth="3.22382"
        />
        <path
          d="M10.8616 40.6064C10.8616 40.6064 20.6083 36.3777 27.2357 36.083C41.2461 35.46 44.6105 39.4278 44.6105 39.4278"
          stroke="#2EC4B6"
          strokeWidth="3.06263"
        />
        <motion.ellipse
          cx="22.4903"
          cy="45.6841"
          rx="2.57905"
          ry="2.74024"
          transform="rotate(-2 22.4903 45.6841)"
          fill="#2EC4B6"
          id="eye-left"
          animate={{
            scaleY: getEyeScale("left"),
          }}
          transition={winkTransition}
        />
        <motion.ellipse
          cx="35.6997"
          cy="45.2228"
          rx="2.57905"
          ry="2.74024"
          transform="rotate(-2 35.6997 45.2228)"
          fill="#2EC4B6"
          id="eye-right"
          animate={{
            scaleY: getEyeScale("right"),
          }}
          transition={winkTransition}
        />
        <motion.path
          d="M23.177 53.8052C23.177 53.8052 26.0337 57.0925 29.6583 56.9659C33.2829 56.8393 35.8228 53.3636 35.8228 53.3636"
          stroke="#2EC4B6"
          strokeWidth="3.06263"
          strokeLinecap="round"
          id="smile"
          animate={{
            scale: winkingEye ? 1.1 : 1,
            rotate: winkingEye ? 2 : 0,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut" as const,
          }}
        />
        <line
          x1="42.3452"
          y1="29.9908"
          x2="42.4858"
          y2="34.0182"
          stroke="#2EC4B6"
          strokeWidth="0.161191"
        />
      </svg>
    </motion.div>
  );
}

"use client";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const pulseVariants = {
  initial: { scale: 1 },
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      //   ease: "easeInOut",
    },
  },
};

const svgVariants = {
  hidden: {},
  visible: {},
};

const verctorVariants = {
  hidden: {
    // opacity: 0,
    pathLength: 0,
    fill: "rgba(255, 255, 255, 0)",
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "rgba(255, 255, 255, 1)",
    transition: {
      fill: { duration: 0.5, delay: 1.5, ease: "easeInOut" },
      duration: 1.5,
      //   ease: "easeInOut",
    },
  },
};

const letterVariants = {
  hidden: { y: 60, scale: 0.8, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      y: { type: "spring", stiffness: 400, damping: 15, delay: i * 0.12 + 2 },
      scale: {
        type: "spring",
        stiffness: 400,
        damping: 15,
        delay: i * 0.12 + 2,
      },
      opacity: { duration: 0.2, delay: i * 0.12 + 2 },
      //   delay: i * 0.12 + 2.5, // start after main vector anim
    },
  }),
};

const pointVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      scale: {
        type: "spring",
        stiffness: 400,
        damping: 20,
        delay: i * 0.08 + 2,
      },
      opacity: { duration: 0.2, delay: i * 0.08 + 2 },
    },
  }),
};

const descriptionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      //   ease: "easeInOut",
      delay: 3.2,
    },
  },
};

const Logo = () => {
  const controls = useAnimation();

  useEffect(() => {
    // Start pulse after all initial animations (about 3.7s)
    const timeout = setTimeout(() => {
      controls.start("pulse");
    }, 3900);
    return () => clearTimeout(timeout);
  }, [controls]);
  return (
    <motion.div
      variants={pulseVariants}
      initial="initial"
      animate={controls}
      style={{ display: "inline-block" }}
    >
      {/* <motion.svg
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 500 500"
        width={400}
        height={400}
        preserveAspectRatio="xMidYMid meet"
        variants={svgVariants}
        initial="hidden"
        animate="visible"
      >
        <rect
          stroke="#d8a241"
          x="232.7"
          y="177"
          width="34.6"
          height="34.6"
          rx="1.7"
          ry="1.7"
          transform="translate(-64.2 233.7) rotate(-45)"
        />
        <g>
          <defs>
            <mask id="revealMask" maskUnits="userSpaceOnUse">
              <rect x="0" y="0" width="500" height="500" fill="black" />

              <motion.path
                d={D1}
                fill="none"
                stroke="white"
                strokeWidth={28} // IMPORTANT: thick enough to cover the filled area
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={draw}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
            </mask>
          </defs>

          <g mask="url(#revealMask)">
            <path d={D1} fill="#a56c37" />
          </g>
          <rect
            stroke="#a56c37"
            x="325.7"
            y="236.2"
            width="27.5"
            height="151.5"
            rx="6.9"
            ry="6.9"
          />
          <path
            stroke="#a56c37"
            d="M305.1,277.5h-13.8c-3.8,0-6.9,3.1-6.9,6.9v68.9c0,3.8-3.1,6.8-6.8,6.8h-27.6c-3.8,0-6.9,3.1-6.9,6.9v13.8c0,3.8,3.1,6.9,6.9,6.9h48.3c7.6,0,13.7-6.1,13.7-13.7v-89.6c0-3.8-3.1-6.9-6.9-6.9Z"
          />
        </g>
        <g>
          <path
            stroke="#d8a241"
            d="M349,210.4c-5.2-23.1-25.8-38.1-45.9-52.7-23.6-17.2-46-33.4-47.3-61.9,0-.4,0-.8,0-1.3,0-.5,0-1,0-1.5,0-3.2-2.6-5.8-5.8-5.8h-.1c-3.2,0-5.8,2.6-5.8,5.8h0c0,.9,0,1.8,0,2.7-1.3,28.5-23.7,44.7-47.3,61.9-20.1,14.6-40.7,29.6-45.9,52.7-15.3,2.4-27,15.6-27,31.5v163.3c0,4,3.5,7.1,7.4,6.6l4.2-.5s0,0,0,0v-169.4c0-11.2,9.1-20.3,20.3-20.3s5.4-2.2,5.8-5.1c2.6-20.8,21.8-34.7,42-49.5,17.6-12.8,36.9-26.8,46.3-47.1,9.4,20.3,28.7,34.3,46.3,47.1,20.3,14.7,39.4,28.6,42,49.5.4,2.9,2.8,5.1,5.8,5.1,11.2,0,20.3,9.1,20.3,20.3v169.4s9.6,1.1,9.6,1.1c1.1.1,2-.7,2-1.8v-168.8c0-15.9-11.7-29.1-27-31.5Z"
          />
          <rect
            stroke="#d8a241"
            x="124"
            y="402.6"
            width="252"
            height="10.2"
            rx="1.4"
            ry="1.4"
          />
        </g>
      </motion.svg> */}
      <motion.svg
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 500 500"
        width={400}
        height={400}
        preserveAspectRatio="xMidYMid meet"
        variants={svgVariants}
        initial="hidden"
        animate="visible"
      >
        <rect
          stroke="#d8a241"
          x="232.7"
          y="177"
          width="34.6"
          height="34.6"
          rx="1.7"
          ry="1.7"
          transform="translate(-64.2 233.7) rotate(-45)"
        />
        <g>
          <motion.path
            stroke="#a56c37"
            fill="none"
            strokeWidth={8}
            strokeLinecap="round"
            d="M305.1,236.2h-109c-4.5,0-8.1,3.6-8.1,8.1v52.7c0,4.5,3.6,8.1,8.1,8.1h40.1c3.8,0,6.9,3.1,6.9,6.9h0c0,3.8-3.1,6.9-6.9,6.9h-53.8c-4.5,0-8.2-3.7-8.2-8.2v-67.6c0-3.8-3.1-6.9-6.9-6.9h-13.8c-3.8,0-6.9,3.1-6.9,6.9v95.1c0,4.5,3.7,8.2,8.2,8.2h108.9c3.8,0,6.9-3.1,6.9-6.9v-55.1c0-3.8-3.1-6.9-6.9-6.9h-41.3c-3.8,0-6.9-3.1-6.9-6.9h0c0-3.8,3.1-6.9,6.9-6.9h82.6c3.8,0,6.9-3.1,6.9-6.9v-13.8c0-3.8-3.1-6.9-6.9-6.9Z"
            variants={verctorVariants}
          />
          <rect
            stroke="#a56c37"
            x="325.7"
            y="236.2"
            width="27.5"
            height="151.5"
            rx="6.9"
            ry="6.9"
          />
          <path
            stroke="#a56c37"
            d="M305.1,277.5h-13.8c-3.8,0-6.9,3.1-6.9,6.9v68.9c0,3.8-3.1,6.8-6.8,6.8h-27.6c-3.8,0-6.9,3.1-6.9,6.9v13.8c0,3.8,3.1,6.9,6.9,6.9h48.3c7.6,0,13.7-6.1,13.7-13.7v-89.6c0-3.8-3.1-6.9-6.9-6.9Z"
          />
        </g>
        <g>
          <path
            stroke="#d8a241"
            d="M349,210.4c-5.2-23.1-25.8-38.1-45.9-52.7-23.6-17.2-46-33.4-47.3-61.9,0-.4,0-.8,0-1.3,0-.5,0-1,0-1.5,0-3.2-2.6-5.8-5.8-5.8h-.1c-3.2,0-5.8,2.6-5.8,5.8h0c0,.9,0,1.8,0,2.7-1.3,28.5-23.7,44.7-47.3,61.9-20.1,14.6-40.7,29.6-45.9,52.7-15.3,2.4-27,15.6-27,31.5v163.3c0,4,3.5,7.1,7.4,6.6l4.2-.5s0,0,0,0v-169.4c0-11.2,9.1-20.3,20.3-20.3s5.4-2.2,5.8-5.1c2.6-20.8,21.8-34.7,42-49.5,17.6-12.8,36.9-26.8,46.3-47.1,9.4,20.3,28.7,34.3,46.3,47.1,20.3,14.7,39.4,28.6,42,49.5.4,2.9,2.8,5.1,5.8,5.1,11.2,0,20.3,9.1,20.3,20.3v169.4s9.6,1.1,9.6,1.1c1.1.1,2-.7,2-1.8v-168.8c0-15.9-11.7-29.1-27-31.5Z"
          />
          <rect
            stroke="#d8a241"
            x="124"
            y="402.6"
            width="252"
            height="10.2"
            rx="1.4"
            ry="1.4"
          />
        </g>
      </motion.svg>
    </motion.div>
  );
};

export default Logo;

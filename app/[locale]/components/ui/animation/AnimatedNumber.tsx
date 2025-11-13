import { animate, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const AnimatedNumber = ({
  value,
  suffix = "",
  play = false,
}: {
  value: number;
  suffix?: string;
  play?: boolean;
}) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  // subscribe to motionVal changes first so we don't miss the initial set
  useEffect(() => {
    // initialize display from current motionVal
    const current = motionVal.get();
    if (value >= 1000) {
      setDisplay(
        Math.round(current) >= 1000
          ? `${Math.round(current / 100) / 10}k`
          : String(Math.round(current))
      );
    } else {
      setDisplay(String(Math.round(current)));
    }

    const unsub = motionVal.on("change", (v: number) => {
      if (value >= 1000) {
        const maybe =
          Math.round(v) >= 1000
            ? `${Math.round(v / 100) / 10}k`
            : String(Math.round(v));
        setDisplay(maybe);
      } else {
        setDisplay(String(Math.round(v)));
      }
    });
    return () => unsub && unsub();
  }, [motionVal, value]);

  // animate the motion value over a fixed duration when play becomes true
  useEffect(() => {
    if (!play) return;
    const controls = animate(motionVal, value, {
      duration: 2,
      ease: "easeOut",
    });
    return () => controls.stop && controls.stop();
  }, [play, value, motionVal]);
  return (
    <span ref={ref} className="text-2xl font-semibold">
      {display}
      {suffix}
    </span>
  );
};

export default AnimatedNumber;

"use client";
import React, { useRef, useEffect, useState } from "react";
import CountUp from "react-countup";

const stats = [
  { end: 14, suffix: "+", label: "Years of experience" },
  { end: 3, suffix: "K", label: "Projects Delivered" },
  { end: 450, suffix: "+", label: "Clients Worldwide" },
  { end: 20, suffix: "+", label: "Industry Partnerships" },
];

const FunFactsStyle2 = () => {
  const [startCount, setStartCount] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="bg-[#F2F4F8] py-10 px-4 lg:px-10 md:px-5">
      <div className="flex items-center justify-between text-center flex-wrap gap-y-6 md:gap-y-0">
        {stats.map((stat, idx) => (
          <React.Fragment key={stat.label}>
            <div className="flex flex-col items-center flex-1 min-w-[150px]">
              <h3 className="lg:text-[46px] md:text-[35px] text-[30px] font-medium text-primaryBlue">
                <CountUp
                  key={startCount ? `countup-${stat.label}` : `static-${stat.label}`}
                  end={stat.end}
                  duration={2.5}
                  suffix={stat.suffix}
                  start={startCount ? 0 : stat.end}
                />
              </h3>
              <span className="mt-2 lg:text-[18px] md:text-[14px] text-sm font-medium text-secondaryColor font-secondary">
                {stat.label}
              </span>
            </div>
            {idx < stats.length - 1 && (
              <div className="hidden lg:block h-16 mx-6 border-l border-primaryBorder"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FunFactsStyle2;

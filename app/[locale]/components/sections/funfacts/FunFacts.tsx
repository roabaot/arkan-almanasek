
"use client"
import React, { useRef, useEffect, useState } from "react";
import CountUp from "react-countup";
import Container from "../../common/Container";

type StatItem = {
  id: number;
  end: number;
  suffix: string;
  label: string;
};

const stats: StatItem[] = [
  { id: 1, end: 600, suffix: "+", label: "Team member" },
  { id: 2, end: 6, suffix: "K", label: "Project Complete" },
  { id: 3, end: 53, suffix: "+", label: "Winning award" },
  { id: 4, end: 3, suffix: "K", label: "Client Review" },
];


const FunFacts: React.FC = () => {
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
    <Container className="section-gap">
      <section ref={sectionRef} className="bg-primaryBlue rounded-[30px] lg:py-10 py-8 lg:px-15 px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center justify-center border border-white rounded-[20px] py-5 px-8 text-center text-white"
            >
              <h2 className="text-white mb-2 md:text-[60px] text-[50px]">
                <CountUp
                  key={startCount ? `countup-${stat.label}` : `static-${stat.label}`}
                  end={stat.end}
                  duration={2.5}
                  separator="," 
                  start={startCount ? 0 : stat.end}
                />
                {stat.suffix}
              </h2>
              <p className="text-white">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
};

export default FunFacts;


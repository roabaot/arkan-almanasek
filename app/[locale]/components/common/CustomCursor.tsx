"use client";
import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    let frameId: number;

    const followCursor = () => {
      const cursor = cursorRef.current;
      if (cursor) {
        const currentX = parseFloat(cursor.style.left || '0');
        const currentY = parseFloat(cursor.style.top || '0');
        const dx = mousePosition.x - currentX;
        const dy = mousePosition.y - currentY;

        cursor.style.left = `${currentX + dx * 0.1}px`;
        cursor.style.top = `${currentY + dy * 0.1}px`;
      }

      const dot = dotRef.current;
      if (dot) {
        dot.style.left = `${mousePosition.x}px`;
        dot.style.top = `${mousePosition.y}px`;
      }

      frameId = requestAnimationFrame(followCursor);
    };

    followCursor();

    return () => cancelAnimationFrame(frameId);
  }, [mousePosition]);

  return (
    <>
      {/* Outer lagging circle */}
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 border border-primaryBlue rounded-full z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 top-0 left-0"
      />

      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed w-3 h-3 bg-primaryBlue rounded-full z-50 pointer-events-none -translate-x-1/2 -translate-y-1/2 top-0 left-0"
      />
    </>
  );
}

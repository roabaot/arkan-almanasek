"use client";
import { useTranslations } from "next-intl";
import React, { useState, useRef, useEffect } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

export interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const t = useTranslations();

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <AccordionSingleItem
          key={index}
          title={t(item.title)}
          content={t(item.content)}
          isOpen={openIndex === index}
          onToggle={() => toggleItem(index)}
        />
      ))}
    </div>
  );
};

interface AccordionSingleItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionSingleItem: React.FC<AccordionSingleItemProps> = ({
  title,
  content,
  isOpen,
  onToggle,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | string>(isOpen ? "auto" : 0);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div
      className={`group border-b border-primaryBorder duration-300 ease-in-out ${
        isOpen ? "border-secondaryColor" : ""
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center gap-x-4 py-5 focus:outline-none cursor-pointer"
      >
        <h5 className="text-start">{title}</h5>
        {isOpen ? (
          <FiMinus className="text-primaryBlue w-6 h-6 font-bold" />
        ) : (
          <FiPlus className="text-black w-6 h-6 font-bold group-hover:text-primaryBlue transition-colors duration-300 ease-in-out" />
        )}
      </button>

      <div
        ref={contentRef}
        style={{
          height,
          transition: "height 300ms ease",
          overflow: "hidden",
        }}
      >
        <p className="pb-4 pt-0">{content}</p>
      </div>
    </div>
  );
};

export default Accordion;

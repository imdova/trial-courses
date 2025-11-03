"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type AccordionItem = {
  title: string;
  content: string;
};

type AccordionProps = {
  items: AccordionItem[];
};

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {items.map((item, index) => (
        <div className="mb-2" key={index}>
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full flex items-center justify-between py-2 text-left font-semibold text-gray-800">
            <span className="group flex items-center text-sm gap-2">
              <span
                className={` w-7 h-7 rounded-full flex items-center justify-center group-hover:bg-green-700  link-smooth  ${
                  openIndex === index
                    ? "bg-green-700 text-white"
                    : "bg-green-600 text-white"
                }`}>
                {openIndex === index ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </span>
              {item.title}
            </span>
          </button>
          {openIndex === index && (
            <div className="ml-8 text-sm text-gray-600">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;

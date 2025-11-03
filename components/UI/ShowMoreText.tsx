"use client";

import { useState } from "react";

type ShowMoreTextProps = {
  text: string;
  maxChars?: number;
};

const ShowMoreText: React.FC<ShowMoreTextProps> = ({
  text,
  maxChars = 200,
}) => {
  const [showMore, setShowMore] = useState(false);

  const toggle = () => setShowMore((prev) => !prev);

  if (text.length <= maxChars) {
    return <p>{text}</p>;
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground">
        {showMore ? text : `${text.slice(0, maxChars)}...`}
      </p>
      <button
        className="block mx-auto mt-2 text-primary hover:underline text-sm font-semibold"
        onClick={toggle}
      >
        {showMore ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

export default ShowMoreText;

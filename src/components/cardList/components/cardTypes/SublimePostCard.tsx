import React from "react";
import { CardData } from "../../../../types/card";

interface SublimePostCardProps {
  card: CardData & { card_type: "sublime_post" };
}

const linkifyText = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

const formatText = (text: string) => {
  return text.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {linkifyText(line)}
      {index < text.split("\n").length - 1 && <br />}
    </React.Fragment>
  ));
};

function SublimePostCard({ card }: SublimePostCardProps) {
  const { content } = card;

  return (
    <div className="text-sm text-gray-900 leading-relaxed p-4 pt-0">
      {formatText(content.text)}
    </div>
  );
}

export default SublimePostCard;

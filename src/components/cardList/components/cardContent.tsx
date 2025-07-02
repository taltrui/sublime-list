import React, { useState } from "react";
import { CardData } from "../../../types/card";
import {
  ArticleCard,
  SocialCard,
  SublimePostCard,
  SublimeImageCard,
  SublimeVideoCard,
} from "./cardTypes";
import { Share } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { set } from "zod";

interface CardContentProps {
  card: CardData;
  classes?: string;
}

const cardContentToRender = {
  article: ArticleCard,
  social: SocialCard,
  sublime_post: SublimePostCard,
  sublime_image: SublimeImageCard,
  sublime_video: SublimeVideoCard,
};

function CardContent({ card, classes }: CardContentProps) {
  const [hasCopied, setHasCopied] = useState(false);

  const ContentToRender: React.FC<{ card: CardData }> | undefined =
    cardContentToRender[card.card_type];

  if (!ContentToRender) {
    return null;
  }

  return (
    <div
      className={`bg-white overflow-hidden rounded-lg mb-6 border border-gray-200 cursor-pointer transition-shadow duration-300 hover:shadow-xl ${classes}`}
    >
      {card.content.author && (
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-xs font-light text-gray-500">
            {card.content.author}
          </h2>
          <Tooltip
            id={`share-tooltip-${card.id}`}
            place="top"
            variant="light"
            content={hasCopied ? "Copied!" : "Share this card"}
            className="shadow-md text-sm"
            style={{
              borderRadius: 8,
            }}
          />
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            data-tooltip-id={`share-tooltip-${card.id}`}
            onClick={(e) => {
              e.stopPropagation();
              setHasCopied(true);
              navigator.clipboard.writeText(
                `${window.location.origin}/card/${card.id}`
              );
              // Reset tooltip after 2 seconds
              setTimeout(() => setHasCopied(false), 2000);
            }}
          >
            <Share className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      )}
      <ContentToRender card={card} />
    </div>
  );
}

export default CardContent;

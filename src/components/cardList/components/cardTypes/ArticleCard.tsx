import { SquareArrowOutUpRight } from "lucide-react";

import { CardData } from "../../../../types/card";
import { getDomain } from "../../../../lib/utils";

interface ArticleCardProps {
  card: CardData & { card_type: "article" };
}

function ArticleCard({ card }: ArticleCardProps) {
  const { content } = card;

  return (
    <div>
      {content.thumbnail && (
        <div className="w-full overflow-hidden bg-gray-50 -z-1 mb-4">
          <img
            src={content.thumbnail}
            alt={content.title}
            loading="lazy"
            className="w-full transition-transform duration-300 hover:scale-105 -z-1"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      )}

      <div className="flex flex-col gap-4 p-4 pt-0">
        <h3 className="text-md font-semibold text-gray-700">{content.title}</h3>

        <div>
          {content.description && (
            <p className="text-sm text-gray-600 mb-1">{content.description}</p>
          )}

          <a
            href={content.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:underline break-words w-fit"
            onClick={(e) => e.stopPropagation()}
          >
            <span>{getDomain(content.url) || "View Article"}</span>
            <SquareArrowOutUpRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;

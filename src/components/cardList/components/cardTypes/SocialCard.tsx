import { useState } from "react";
import { CardData } from "../../../../types/card";
import { getDomain } from "../../../../lib/utils";
import { SquareArrowOutUpRight } from "lucide-react";

interface SocialCardProps {
  card: CardData & { card_type: "social" };
}

function SocialCard({ card }: SocialCardProps) {
  const { content } = card;
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<number>>(
    new Set()
  );

  const handleImageError = (index: number) => {
    setImageLoadErrors((prev) => new Set(prev).add(index));
  };

  return (
    <div>
      <div>
        {content.title && content.title !== "Tweet" && (
          <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
            {content.title}
          </h3>
        )}

        {content.images && content.images.length > 0 && (
          <div
            className={`mb-4 ${
              content.images.length > 1 ? "grid grid-cols-2" : ""
            }`}
          >
            {content.images.map(
              (image, index) =>
                !imageLoadErrors.has(index) && (
                  <div key={index} className="overflow-hidden bg-gray-50">
                    <img
                      src={image}
                      alt={`Image ${index + 1}`}
                      loading="lazy"
                      className="w-full h-auto transition-transform duration-300 hover:scale-105"
                      onError={() => handleImageError(index)}
                    />
                  </div>
                )
            )}
          </div>
        )}
        {content.videos && content.videos.length > 0 && (
          <div className="mb-3">
            {content.videos.map((video, index) => (
              <div key={index} className="overflow-hidden bg-black">
                <video
                  poster={video.thumbnail}
                  controls
                  className="w-full h-auto"
                  preload="metadata"
                >
                  <source src={video.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-col gap-2 p-4 pt-0">
          <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-wrap">
            {content.text}
          </p>
          <a
            href={content.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:underline break-words w-fit"
            onClick={(e) => e.stopPropagation()}
          >
            {getDomain(content.url) || "View original post"}
            <SquareArrowOutUpRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default SocialCard;

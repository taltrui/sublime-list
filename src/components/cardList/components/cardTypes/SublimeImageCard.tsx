import { useState } from "react";
import { CardData } from "../../../../types/card";

interface SublimeImageCardProps {
  card: CardData & { card_type: "sublime_image" };
}

function SublimeImageCard({ card }: SublimeImageCardProps) {
  const { content } = card;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div>
      {!imageError && (
        <div className="relative w-full rounded-lg overflow-hidden bg-gray-50 min-h-50 flex items-center justify-center">
          {!imageLoaded && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            </div>
          )}

          <img
            src={content.url}
            alt={content.title || "Image"}
            loading="lazy"
            className={`w-full h-auto max-h-125 object-contain transition-all duration-300 hover:scale-101 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </div>
      )}

      {content.description && (
        <p className="text-sm text-gray-600 leading-relaxed">
          {content.description}
        </p>
      )}
    </div>
  );
}

export default SublimeImageCard;

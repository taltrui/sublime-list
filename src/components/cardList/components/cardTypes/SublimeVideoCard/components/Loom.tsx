import { useState } from "react";
import {
  getLoomEmbedUrl,
  getLoomVideoId,
  getVimeoThumbnail,
} from "../../../../../../lib/videos";
import { SiLoom } from "@icons-pack/react-simple-icons";

function Loom({ content }) {
  const [showVideo, setShowVideo] = useState(false);
  const loomVideoId = getLoomVideoId(content.url);

  if (!loomVideoId) {
    return (
      <div className="text-sm">Invalid Loom URL. Please check the link.</div>
    );
  }

  if (showVideo) {
    return (
      <div
        className="relative w-full bg-gray-100 mb-4 rounded-lg overflow-hidden"
        style={{ aspectRatio: "16/9" }}
      >
        <iframe
          className="absolute inset-0 w-full h-full"
          src={getLoomEmbedUrl(loomVideoId)}
          title={content.title || "Loom video"}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  const thumbnailUrl = content.thumbnail || getVimeoThumbnail(loomVideoId);
  return (
    <div
      className="relative overflow-hidden bg-black mb-4 cursor-pointer group"
      style={{ aspectRatio: "16/9" }}
      onClick={(e) => {
        setShowVideo(true);
        e.stopPropagation();
      }}
    >
      <img
        src={thumbnailUrl}
        alt={content.title || "Video thumbnail"}
        className="w-full h-full"
      />
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-16 h-16 bg-opacity-90 rounded-full flex items-center justify-center text-white text-2xl transition-transform duration-200 hover:scale-110">
          <SiLoom size={96} />
        </div>
      </div>
    </div>
  );
}

export default Loom;

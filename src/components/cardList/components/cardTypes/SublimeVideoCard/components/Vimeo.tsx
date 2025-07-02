import { useState } from "react";
import {
  getVimeoEmbedUrl,
  getVimeoThumbnail,
  getVimeoVideoId,
} from "../../../../../../lib/videos";
import { SiVimeo } from "@icons-pack/react-simple-icons";

function Vimeo({
  content,
}: {
  content: { url: string; title?: string; thumbnail?: string };
}) {
  const [showVideo, setShowVideo] = useState(false);
  const vimeoVideoId = getVimeoVideoId(content.url);

  if (!vimeoVideoId) {
    return (
      <div className="text-sm">Invalid Vimeo URL. Please check the link.</div>
    );
  }

  if (showVideo) {
    return (
      <div
        className="relative w-full bg-black mb-4"
        style={{ aspectRatio: "16/9" }}
      >
        <iframe
          className="absolute inset-0 w-full h-full"
          src={getVimeoEmbedUrl(vimeoVideoId)}
          title={content.title || "Vimeo video"}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  } else {
    const thumbnailUrl = content.thumbnail || getVimeoThumbnail(vimeoVideoId);
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
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16rounded-full flex items-center justify-center text-blue-600 text-2xl transition-transform duration-200 hover:scale-110">
            <SiVimeo size={96} />
          </div>
        </div>
      </div>
    );
  }
}

export default Vimeo;

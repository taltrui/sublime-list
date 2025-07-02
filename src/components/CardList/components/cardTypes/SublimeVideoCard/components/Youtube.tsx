import { SiYoutube } from "@icons-pack/react-simple-icons";
import { useState } from "react";
import {
	getYouTubeEmbedUrl,
	getYouTubeThumbnail,
	getYouTubeVideoId,
} from "../../../../../../lib/videos";

function Youtube({
	content,
}: {
	content: { url: string; title: string; thumbnail: string };
}) {
	const [showVideo, setShowVideo] = useState(false);
	const youtubeVideoId = getYouTubeVideoId(content.url);

	if (!youtubeVideoId) {
		return (
			<div className="text-sm">Invalid YouTube URL. Please check the link.</div>
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
					src={getYouTubeEmbedUrl(youtubeVideoId)}
					title={content.title || "YouTube video"}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				/>
			</div>
		);
	}

	const thumbnailUrl =
		content.thumbnail || getYouTubeThumbnail(youtubeVideoId, "high");
	return (
		<button
			type="button"
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
					<SiYoutube size={96} />
				</div>
			</div>
		</button>
	);
}

export default Youtube;

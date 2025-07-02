import { SquareArrowOutUpRight } from "lucide-react";
import { getDomain } from "../../../../../lib/utils";
import { getPlatform } from "../../../../../lib/videos";
import type { CardData } from "../../../../../types/card";
import Loom from "./components/Loom";
import Other from "./components/Other";
import SoundCloudEmbed from "./components/Soundcloud";
import TikTokEmbed from "./components/Tiktok";
import Vimeo from "./components/Vimeo";
import Youtube from "./components/Youtube";

interface SublimeVideoCardProps {
	card: CardData & { card_type: "sublime_video" };
}

const rendererMap = {
	youtube: Youtube,
	vimeo: Vimeo,
	soundcloud: SoundCloudEmbed,
	tiktok: TikTokEmbed,
	loom: Loom,
};
function SublimeVideoCard({ card }: SublimeVideoCardProps) {
	const { content } = card;

	const platform = getPlatform(content.url);

	const VideoComponent = rendererMap[platform] || Other;
	return (
		<div>
			<VideoComponent content={content} />

			<div className="flex flex-col gap-2 p-4 pt-0">
				{content.title && (
					<h3 className="text-lg font-semibold text-gray-900 mb-2">
						{content.title}
					</h3>
				)}

				{content.description && (
					<p className="text-sm text-gray-600">{content.description}</p>
				)}

				{platform === "other" && (
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
				)}
			</div>
		</div>
	);
}

export default SublimeVideoCard;

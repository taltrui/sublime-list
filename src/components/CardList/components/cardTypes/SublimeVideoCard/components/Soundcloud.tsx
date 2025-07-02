import { SiSoundcloud } from "@icons-pack/react-simple-icons";
import { useEffect, useState } from "react";
import { getSoundCloudOEmbedData } from "../../../../../../lib/videos";

interface SoundCloudEmbedProps {
	content: { url: string; title?: string; thumbnail?: string };
}

function SoundCloudEmbed({ content }: SoundCloudEmbedProps) {
	const [embedHtml, setEmbedHtml] = useState<string>("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [show, setShow] = useState(false);

	useEffect(() => {
		const fetchEmbed = async () => {
			try {
				setLoading(true);
				setError(false);

				const data = await getSoundCloudOEmbedData(content.url);

				if (data?.html) {
					setEmbedHtml(data.html);
				} else {
					throw new Error("No embed data received");
				}
			} catch (err) {
				console.error("SoundCloud embed error:", err);
				setError(true);
			} finally {
				setLoading(false);
			}
		};

		fetchEmbed();
	}, [content.url]);

	if (!show) {
		return (
			<button
				type="button"
				className="relative overflow-hidden bg-black mb-4 cursor-pointer group"
				style={{ aspectRatio: "16/9" }}
				onClick={(e) => {
					setShow(true);
					e.stopPropagation();
				}}
			>
				<img
					src={content.thumbnail}
					alt={content.title || "Video thumbnail"}
					className="w-full h-full"
				/>
				<div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
					<div className="w-16 h-16 bg-opacity-90 rounded-full flex items-center justify-center text-white text-2xl transition-transform duration-200 hover:scale-110">
						<SiSoundcloud size={96} />
					</div>
				</div>
			</button>
		);
	}
	if (loading) {
		return (
			<div className="flex flex-col items-center justify-center py-12 px-4 bg-orange-50 rounded-lg">
				<div className="w-8 h-8 border-2 border-orange-300 border-t-orange-600 rounded-full animate-spin mb-3"></div>
				<p className="text-sm text-orange-700">Loading SoundCloud track...</p>
			</div>
		);
	}

	if (error || !embedHtml) {
		return (
			<div className="flex flex-col items-center justify-center py-12 px-4 bg-orange-50 rounded-lg border border-orange-200">
				<div className="text-4xl mb-3">🎧</div>
				<p className="text-sm font-medium text-orange-800 mb-2">
					SoundCloud Track
				</p>
				<a
					href={content.url}
					target="_blank"
					rel="noopener noreferrer"
					className="text-sm text-orange-600 hover:underline"
					onClick={(e) => e.stopPropagation()}
				>
					Listen on SoundCloud
				</a>
			</div>
		);
	}

	return (
		<div
			className="soundcloud-embed"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: Needed for SoundCloud embed
			dangerouslySetInnerHTML={{ __html: embedHtml }}
		/>
	);
}

export default SoundCloudEmbed;

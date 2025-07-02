function Other({
	content,
}: {
	content: { url: string; title: string; thumbnail: string };
}) {
	return (
		<div
			className="relative overflow-hidden bg-black mb-4 cursor-pointer group"
			style={{ aspectRatio: "16/9" }}
		>
			<img
				src={content.thumbnail}
				alt={content.title || "Video thumbnail"}
				className="w-full h-full"
			/>
		</div>
	);
}

export default Other;

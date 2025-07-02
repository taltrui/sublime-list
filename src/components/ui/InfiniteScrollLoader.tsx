function InfiniteScrollLoader({ isLoading }: { isLoading: boolean }) {
	if (!isLoading) return null;

	return (
		<div className="max-w-2xl mx-auto mb-6 flex flex-col items-center gap-4 py-8">
			<div className="flex items-center gap-2">
				<div className="w-2 h-2 bg-cyan-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
				<div className="w-2 h-2 bg-cyan-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
				<div className="w-2 h-2 bg-cyan-600 rounded-full animate-bounce"></div>
			</div>

			<p className="text-sm text-gray-500 font-light">Getting some more</p>

			<div className="w-full space-y-4 mt-4">
				{[1, 2].map((i) => (
					<div
						key={i}
						className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse"
					>
						<div className="flex items-start gap-4">
							<div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
							<div className="flex-1 space-y-3">
								<div className="h-4 bg-gray-200 rounded w-3/4"></div>
								<div className="h-3 bg-gray-200 rounded w-1/2"></div>
								<div className="h-3 bg-gray-200 rounded w-2/3"></div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default InfiniteScrollLoader;

function ErrorBoundary() {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-6 rounded-lg shadow-md text-center">
				<h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
				<p className="text-gray-600 mb-4">
					We encountered an error while trying to display this content.
				</p>
				<p className="text-gray-500 text-sm">
					Please try refreshing the page or come back later.
				</p>
			</div>
		</div>
	);
}

export default ErrorBoundary;

import { describe, expect, it } from "vitest";
import { render, screen } from "../../../test/test-utils";
import InfiniteScrollLoader from "../InfiniteScrollLoader";

describe("InfiniteScrollLoader", () => {
	it("should render loading state when isLoading is true", () => {
		render(<InfiniteScrollLoader isLoading={true} />);

		expect(screen.getByText("Getting some more")).toBeInTheDocument();

		const dots = document.querySelectorAll(".animate-bounce");
		expect(dots).toHaveLength(3);

		const skeletonCards = document.querySelectorAll(".animate-pulse");
		expect(skeletonCards).toHaveLength(2);
	});

	it("should not render anything when isLoading is false", () => {
		const { container } = render(<InfiniteScrollLoader isLoading={false} />);
		expect(container.firstChild).toBeNull();
	});

	it("should render loading dots with correct styling", () => {
		render(<InfiniteScrollLoader isLoading={true} />);

		const dots = document.querySelectorAll(
			".w-2.h-2.bg-cyan-600.rounded-full.animate-bounce",
		);
		expect(dots).toHaveLength(3);
	});

	it("should render skeleton loading cards", () => {
		render(<InfiniteScrollLoader isLoading={true} />);

		const skeletonCards = document.querySelectorAll(
			".bg-white.rounded-lg.border.border-gray-200.p-4.animate-pulse",
		);
		expect(skeletonCards).toHaveLength(2);
	});
});

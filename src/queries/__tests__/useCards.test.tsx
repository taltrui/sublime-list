import { describe, expect, it } from "vitest";
import { cardsQueryOptions } from "../useCards";

describe("useCards", () => {
	it("should create correct infinite query options", () => {
		const options = cardsQueryOptions({ pageSize: 10 });

		expect(options.queryKey).toEqual(["cards"]);
		expect(typeof options.queryFn).toBe("function");
		expect(options.initialPageParam).toBe(1);
		expect(typeof options.getNextPageParam).toBe("function");
	});

	it("should calculate next page param correctly", () => {
		const options = cardsQueryOptions({ pageSize: 10 });

		const lastPageWithMore = {
			results: [],
			count: 50,
			current_page: 2,
			next: "next-url",
			page_size: 10,
			total_pages: 5,
		};

		expect(options.getNextPageParam(lastPageWithMore)).toBe(3);

		const lastPageFinal = {
			results: [],
			count: 50,
			current_page: 5,
			next: null,
			page_size: 10,
			total_pages: 5,
		};

		expect(options.getNextPageParam(lastPageFinal)).toBeUndefined();
	});
});

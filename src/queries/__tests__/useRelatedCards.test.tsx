import { describe, expect, it } from "vitest";
import { relatedCardsQueryOptions } from "../useRelatedCards";

describe("useRelatedCards", () => {
	it("should create correct infinite query options", () => {
		const options = relatedCardsQueryOptions({ pageSize: 10, id: 1 });

		expect(options.queryKey).toEqual(["relatedCards", 1]);
		expect(typeof options.queryFn).toBe("function");
		expect(options.initialPageParam).toBe(1);
		expect(typeof options.getNextPageParam).toBe("function");
	});

	it("should have different query keys for different IDs", () => {
		const options1 = relatedCardsQueryOptions({ pageSize: 10, id: 1 });
		const options2 = relatedCardsQueryOptions({ pageSize: 10, id: 2 });

		expect(options1.queryKey).toEqual(["relatedCards", 1]);
		expect(options2.queryKey).toEqual(["relatedCards", 2]);
	});

	it("should calculate next page param correctly", () => {
		const options = relatedCardsQueryOptions({ pageSize: 5, id: 1 });

		const lastPageWithMore = {
			results: [],
			count: 25,
			current_page: 3,
			next: "next-url",
			page_size: 5,
			total_pages: 5,
		};

		expect(options.getNextPageParam(lastPageWithMore)).toBe(4);

		const lastPageFinal = {
			results: [],
			count: 25,
			current_page: 5,
			next: null,
			page_size: 5,
			total_pages: 5,
		};

		expect(options.getNextPageParam(lastPageFinal)).toBeUndefined();
	});
});

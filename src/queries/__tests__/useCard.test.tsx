import { describe, expect, it, vi } from "vitest";
import { cardQueryOptions } from "../useCard";

vi.mock("../server-functions/getCard");

describe("useCard", () => {
	it("should create correct query options", () => {
		const options = cardQueryOptions({ id: 1 });

		expect(options.queryKey).toEqual(["card", 1]);
		expect(typeof options.queryFn).toBe("function");
	});

	it("should have correct query key for different IDs", () => {
		const options1 = cardQueryOptions({ id: 1 });
		const options2 = cardQueryOptions({ id: 2 });

		expect(options1.queryKey).toEqual(["card", 1]);
		expect(options2.queryKey).toEqual(["card", 2]);
	});
});

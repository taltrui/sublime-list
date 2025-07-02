import { describe, expect, it } from "vitest";
import { apiClient } from "../api";

describe("api", () => {
	describe("apiClient", () => {
		it("should have a valid baseURL", () => {
			expect(apiClient.defaults.baseURL).toBeDefined();
			expect(apiClient.defaults.baseURL).toMatch(/\/api$/);
		});

		it("should be an axios instance", () => {
			expect(apiClient.defaults).toBeDefined();
			expect(typeof apiClient.get).toBe("function");
			expect(typeof apiClient.post).toBe("function");
		});
	});
});

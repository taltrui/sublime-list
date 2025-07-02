import { describe, expect, it } from "vitest";
import {
	getDomain,
	getInstagramPostId,
	isInstagramUrl,
	isLoomUrl,
	isTikTokUrl,
} from "../utils";

describe("utils", () => {
	describe("getDomain", () => {
		it("should extract domain from URL", () => {
			expect(getDomain("https://example.com/path")).toBe("example.com");
			expect(getDomain("https://www.example.com/path")).toBe("example.com");
			expect(getDomain("https://subdomain.example.com")).toBe(
				"subdomain.example.com",
			);
		});

		it("should return empty string for invalid URLs", () => {
			expect(getDomain("invalid-url")).toBe("");
			expect(getDomain("")).toBe("");
		});
	});

	describe("isInstagramUrl", () => {
		it("should return true for Instagram URLs", () => {
			expect(isInstagramUrl("https://www.instagram.com/p/ABC123/")).toBe(true);
			expect(isInstagramUrl("https://instagram.com/user/")).toBe(true);
		});

		it("should return false for non-Instagram URLs", () => {
			expect(isInstagramUrl("https://twitter.com/user")).toBe(false);
			expect(isInstagramUrl("invalid-url")).toBe(false);
		});
	});

	describe("getInstagramPostId", () => {
		it("should extract post ID from Instagram URLs", () => {
			expect(getInstagramPostId("https://www.instagram.com/p/ABC123/")).toBe(
				"ABC123",
			);
			expect(getInstagramPostId("https://instagram.com/p/XYZ789/")).toBe(
				"XYZ789",
			);
		});

		it("should return null for invalid URLs or non-post URLs", () => {
			expect(getInstagramPostId("https://instagram.com/user/")).toBe(null);
			expect(getInstagramPostId("invalid-url")).toBe(null);
		});
	});

	describe("isTikTokUrl", () => {
		it("should return true for TikTok URLs", () => {
			expect(isTikTokUrl("https://www.tiktok.com/@user/video/123")).toBe(true);
			expect(isTikTokUrl("https://tiktok.com/video/456")).toBe(true);
		});

		it("should return false for non-TikTok URLs", () => {
			expect(isTikTokUrl("https://youtube.com/watch?v=123")).toBe(false);
			expect(isTikTokUrl("invalid-url")).toBe(false);
		});
	});

	describe("isLoomUrl", () => {
		it("should return true for Loom URLs", () => {
			expect(isLoomUrl("https://www.loom.com/share/abc123")).toBe(true);
			expect(isLoomUrl("https://loom.com/share/xyz789")).toBe(true);
		});

		it("should return false for non-Loom URLs", () => {
			expect(isLoomUrl("https://youtube.com/watch?v=123")).toBe(false);
			expect(isLoomUrl("invalid-url")).toBe(false);
		});
	});
});

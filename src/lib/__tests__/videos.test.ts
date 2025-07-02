import { describe, expect, it, vi } from "vitest";
import {
	getLoomEmbedUrl,
	getLoomVideoId,
	getPlatform,
	getVimeoEmbedUrl,
	getVimeoThumbnail,
	getVimeoVideoId,
	getYouTubeEmbedUrl,
	getYouTubeThumbnail,
	getYouTubeVideoId,
} from "../videos";

describe("videos", () => {
	describe("getPlatform", () => {
		it("should identify YouTube URLs", () => {
			expect(getPlatform("https://www.youtube.com/watch?v=abc123")).toBe(
				"youtube",
			);
			expect(getPlatform("https://youtu.be/abc123")).toBe("youtube");
		});

		it("should identify Vimeo URLs", () => {
			expect(getPlatform("https://vimeo.com/123456789")).toBe("vimeo");
		});

		it("should identify TikTok URLs", () => {
			expect(getPlatform("https://www.tiktok.com/@user/video/123")).toBe(
				"tiktok",
			);
		});

		it("should identify Loom URLs", () => {
			expect(getPlatform("https://www.loom.com/share/abc123")).toBe("loom");
		});

		it("should identify SoundCloud URLs", () => {
			expect(getPlatform("https://soundcloud.com/user/track")).toBe(
				"soundcloud",
			);
		});

		it('should return "other" for unknown platforms', () => {
			expect(getPlatform("https://example.com/video")).toBe("other");
		});
	});

	describe("getYouTubeVideoId", () => {
		it("should extract video ID from youtube.com URLs", () => {
			expect(getYouTubeVideoId("https://www.youtube.com/watch?v=abc123")).toBe(
				"abc123",
			);
			expect(getYouTubeVideoId("https://youtube.com/watch?v=xyz789")).toBe(
				"xyz789",
			);
		});

		it("should extract video ID from youtu.be URLs", () => {
			expect(getYouTubeVideoId("https://youtu.be/abc123")).toBe("abc123");
		});

		it("should return null for invalid URLs", () => {
			expect(getYouTubeVideoId("https://vimeo.com/123")).toBe(null);
			expect(getYouTubeVideoId("invalid-url")).toBe(null);
		});
	});

	describe("getYouTubeEmbedUrl", () => {
		it("should generate correct embed URL", () => {
			expect(getYouTubeEmbedUrl("abc123")).toBe(
				"https://www.youtube.com/embed/abc123",
			);
		});
	});

	describe("getYouTubeThumbnail", () => {
		it("should generate thumbnail URL with default quality", () => {
			expect(getYouTubeThumbnail("abc123")).toBe(
				"https://img.youtube.com/vi/abc123/mqdefault.jpg",
			);
		});

		it("should generate thumbnail URL with specified quality", () => {
			expect(getYouTubeThumbnail("abc123", "high")).toBe(
				"https://img.youtube.com/vi/abc123/hqdefault.jpg",
			);
			expect(getYouTubeThumbnail("abc123", "maxres")).toBe(
				"https://img.youtube.com/vi/abc123/maxresdefault.jpg",
			);
		});
	});

	describe("getVimeoVideoId", () => {
		it("should extract video ID from Vimeo URLs", () => {
			expect(getVimeoVideoId("https://vimeo.com/123456789")).toBe("123456789");
			expect(getVimeoVideoId("https://vimeo.com/video/123456789")).toBe(
				"123456789",
			);
		});

		it("should return null for invalid URLs", () => {
			expect(getVimeoVideoId("https://youtube.com/watch?v=123")).toBe(null);
			expect(getVimeoVideoId("invalid-url")).toBe(null);
		});
	});

	describe("getVimeoThumbnail", () => {
		it("should generate thumbnail URL", () => {
			expect(getVimeoThumbnail("123456789")).toBe(
				"https://vumbnail.com/123456789.jpg",
			);
		});
	});

	describe("getVimeoEmbedUrl", () => {
		it("should generate correct embed URL", () => {
			expect(getVimeoEmbedUrl("123456789")).toBe(
				"https://player.vimeo.com/video/123456789",
			);
		});
	});

	describe("getLoomVideoId", () => {
		it("should extract video ID from Loom URLs", () => {
			expect(getLoomVideoId("https://www.loom.com/share/abc123def456")).toBe(
				"abc123def456",
			);
			expect(getLoomVideoId("https://loom.com/share/xyz789")).toBe("xyz789");
		});

		it("should return null for invalid URLs", () => {
			expect(getLoomVideoId("https://youtube.com/watch?v=123")).toBe(null);
			expect(getLoomVideoId("invalid-url")).toBe(null);
		});
	});

	describe("getLoomEmbedUrl", () => {
		it("should generate correct embed URL", () => {
			expect(getLoomEmbedUrl("abc123")).toBe(
				"https://www.loom.com/embed/abc123",
			);
		});
	});
});

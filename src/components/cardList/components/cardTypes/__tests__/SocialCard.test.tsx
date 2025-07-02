import { describe, expect, it } from "vitest";
import { render, screen } from "../../../../../test/test-utils";
import type { CardData } from "../../../../../types/card";
import SocialCard from "../SocialCard";

const mockSocialCard: CardData & { card_type: "social" } = {
	id: 1,
	card_type: "social",
	created_at: "2023-01-01T00:00:00Z",
	updated_at: "2023-01-01T00:00:00Z",
	related: [],
	notes: [],
	slug: "test-social",
	content: {
		card_type: "social",
		url: "https://twitter.com/user/status/123",
		title: "Test Social Post",
		text: "This is a test social media post",
		author: "Test Author",
		images: [
			"https://example.com/image1.jpg",
			"https://example.com/image2.jpg",
		],
	},
};

describe("SocialCard", () => {
	it('should render social post title when not "Tweet"', () => {
		render(<SocialCard card={mockSocialCard} />);
		expect(screen.getByText("Test Social Post")).toBeInTheDocument();
	});

	it('should not render title when it is "Tweet"', () => {
		const cardWithTweetTitle = {
			...mockSocialCard,
			content: {
				...mockSocialCard.content,
				title: "Tweet",
			},
		};
		render(<SocialCard card={cardWithTweetTitle} />);
		expect(screen.queryByText("Tweet")).not.toBeInTheDocument();
	});

	it("should render social post text", () => {
		render(<SocialCard card={mockSocialCard} />);
		expect(
			screen.getByText("This is a test social media post"),
		).toBeInTheDocument();
	});

	it("should render external link with domain", () => {
		render(<SocialCard card={mockSocialCard} />);
		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "https://twitter.com/user/status/123");
		expect(link).toHaveAttribute("target", "_blank");
		expect(screen.getByText("twitter.com")).toBeInTheDocument();
	});

	it("should render multiple images in grid layout", () => {
		render(<SocialCard card={mockSocialCard} />);
		const images = screen.getAllByRole("img");
		expect(images).toHaveLength(2);
		expect(images[0]).toHaveAttribute("src", "https://example.com/image1.jpg");
		expect(images[1]).toHaveAttribute("src", "https://example.com/image2.jpg");
	});

	it("should render single image without grid layout", () => {
		const cardWithSingleImage = {
			...mockSocialCard,
			content: {
				...mockSocialCard.content,
				images: ["https://example.com/image1.jpg"],
			},
		};
		render(<SocialCard card={cardWithSingleImage} />);
		const images = screen.getAllByRole("img");
		expect(images).toHaveLength(1);
	});

	it("should render videos when provided", () => {
		const cardWithVideos = {
			...mockSocialCard,
			content: {
				...mockSocialCard.content,
				videos: [
					{
						video_url: "https://example.com/video.mp4",
						thumbnail: "https://example.com/video-thumb.jpg",
					},
				],
			},
		};
		render(<SocialCard card={cardWithVideos} />);
		const video = document.querySelector("video");
		expect(video).toBeInTheDocument();
	});

	it("should not render images section when no images provided", () => {
		const cardWithoutImages = {
			...mockSocialCard,
			content: {
				...mockSocialCard.content,
				images: undefined,
			},
		};
		render(<SocialCard card={cardWithoutImages} />);
		const images = screen.queryAllByRole("img");
		expect(images).toHaveLength(0);
	});
});

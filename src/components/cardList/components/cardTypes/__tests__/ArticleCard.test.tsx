import { describe, expect, it } from "vitest";
import { render, screen } from "../../../../../test/test-utils";
import type { CardData } from "../../../../../types/card";
import ArticleCard from "../ArticleCard";

const mockArticleCard: CardData & { card_type: "article" } = {
	id: 1,
	card_type: "article",
	created_at: "2023-01-01T00:00:00Z",
	updated_at: "2023-01-01T00:00:00Z",
	related: [],
	notes: [],
	slug: "test-article",
	content: {
		card_type: "social",
		url: "https://example.com/article",
		title: "Test Article Title",
		text: "Test article content",
		description: "Test article description",
		thumbnail: "https://example.com/thumbnail.jpg",
		author: "Test Author",
	},
};

describe("ArticleCard", () => {
	it("should render article title", () => {
		render(<ArticleCard card={mockArticleCard} />);
		expect(screen.getByText("Test Article Title")).toBeInTheDocument();
	});

	it("should render article description", () => {
		render(<ArticleCard card={mockArticleCard} />);
		expect(screen.getByText("Test article description")).toBeInTheDocument();
	});

	it("should render thumbnail image when provided", () => {
		render(<ArticleCard card={mockArticleCard} />);
		const thumbnail = screen.getByAltText("Test Article Title");
		expect(thumbnail).toBeInTheDocument();
		expect(thumbnail).toHaveAttribute(
			"src",
			"https://example.com/thumbnail.jpg",
		);
	});

	it("should render external link with domain", () => {
		render(<ArticleCard card={mockArticleCard} />);
		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "https://example.com/article");
		expect(link).toHaveAttribute("target", "_blank");
		expect(screen.getByText("example.com")).toBeInTheDocument();
	});

	it("should not render thumbnail when not provided", () => {
		const cardWithoutThumbnail = {
			...mockArticleCard,
			content: {
				...mockArticleCard.content,
				thumbnail: undefined,
			},
		};
		render(<ArticleCard card={cardWithoutThumbnail} />);
		expect(screen.queryByAltText("Test Article Title")).not.toBeInTheDocument();
	});

	it("should not render description when not provided", () => {
		const cardWithoutDescription = {
			...mockArticleCard,
			content: {
				...mockArticleCard.content,
				description: undefined,
			},
		};
		render(<ArticleCard card={cardWithoutDescription} />);
		expect(
			screen.queryByText("Test article description"),
		).not.toBeInTheDocument();
	});
});

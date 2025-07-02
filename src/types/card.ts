export interface CardContent {
	card_type: "social";
	url: string;
	title: string;
	text: string;
	thumbnail?: string;
	images?: string[];
	description?: string;
	videos?: Array<{
		video_url: string;
		thumbnail: string;
	}>;
	author: string;
}
export type CardType =
	| "article"
	| "social"
	| "sublime_post"
	| "sublime_image"
	| "sublime_video";

export interface CardData {
	card_type: CardType;
	id: number;
	created_at: string;
	updated_at: string;
	related: number[];
	notes: string[];
	slug: string;
	content: CardContent;
}

export interface GetCardsResponse {
	results: CardData[];
	count: number;
	current_page: number;
	next: string | null;
	page_size: number;
	total_pages: number;
}

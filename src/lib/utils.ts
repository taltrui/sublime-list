export function getDomain(url: string): string {
	try {
		const hostname = new URL(url).hostname;

		return hostname.replace(/^www\./, "");
	} catch (_error) {
		return "";
	}
}

export function isInstagramUrl(url: string): boolean {
	try {
		const urlObj = new URL(url);
		return urlObj.hostname.includes("instagram.com");
	} catch (_error) {
		return false;
	}
}

export function getInstagramPostId(url: string): string | null {
	try {
		const urlObj = new URL(url);
		// Instagram post URLs: https://www.instagram.com/p/POST_ID/
		const match = urlObj.pathname.match(/\/p\/([^/]+)/);
		return match ? match[1] : null;
	} catch (_error) {
		return null;
	}
}

export async function getInstagramOEmbedData(
	url: string,
): Promise<string | null> {
	try {
		const response = await fetch(
			`https://graph.facebook.com/v17.0/instagram_oembed?url=${encodeURIComponent(
				url,
			)}&access_token=YOUR_ACCESS_TOKEN`,
		);
		return await response.json();
	} catch (error) {
		console.error("Failed to fetch Instagram oEmbed data:", error);
		return null;
	}
}

export function isTikTokUrl(url: string): boolean {
	try {
		const urlObj = new URL(url);
		return urlObj.hostname.includes("tiktok.com");
	} catch (_error) {
		return false;
	}
}

export function isLoomUrl(url: string): boolean {
	try {
		const urlObj = new URL(url);
		return urlObj.hostname.includes("loom.com");
	} catch (_error) {
		return false;
	}
}

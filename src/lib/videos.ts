export const getPlatform = (url: string) => {
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  if (url.includes("vimeo.com")) return "vimeo";
  if (url.includes("tiktok.com")) return "tiktok";
  if (url.includes("loom.com")) return "loom";
  if (url.includes("soundcloud.com")) return "soundcloud";
  return "other";
};

export function getYouTubeVideoId(url: string): string | null {
  try {
    const urlObj = new URL(url);

    if (urlObj.hostname === "youtu.be") {
      return urlObj.pathname.slice(1);
    } else if (urlObj.hostname.includes("youtube.com")) {
      return urlObj.searchParams.get("v");
    }

    return null;
  } catch (error) {
    return null;
  }
}

export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}

export function getYouTubeThumbnail(
  videoId: string,
  quality: "default" | "medium" | "high" | "standard" | "maxres" = "medium"
): string {
  const qualityMap = {
    default: "default",
    medium: "mqdefault",
    high: "hqdefault",
    standard: "sddefault",
    maxres: "maxresdefault",
  };

  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

export function getVimeoVideoId(url: string): string | null {
  try {
    const urlObj = new URL(url);

    if (urlObj.hostname.includes("vimeo.com")) {
      const match = urlObj.pathname.match(/\/(?:video\/)?(\d+)/);
      return match ? match[1] : null;
    }

    return null;
  } catch (error) {
    return null;
  }
}

export function getVimeoThumbnail(videoId: string): string {
  // Vimeo thumbnails require API call, but we can use a placeholder
  // For production, you'd want to fetch from Vimeo's API
  return `https://vumbnail.com/${videoId}.jpg`;
}

export function getVimeoEmbedUrl(videoId: string): string {
  return `https://player.vimeo.com/video/${videoId}`;
}

export async function getSoundCloudOEmbedData(url: string): Promise<any> {
  try {
    const response = await fetch(
      `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(url)}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch SoundCloud embed");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch SoundCloud oEmbed data:", error);
    return null;
  }
}

export async function getTikTokOEmbedData(url: string): Promise<any> {
  try {
    const response = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch TikTok embed");
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch TikTok oEmbed data:", error);
    return null;
  }
}

export function getLoomVideoId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const match = urlObj.pathname.match(/\/share\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  } catch (error) {
    return null;
  }
}

export function getLoomEmbedUrl(videoId: string): string {
  return `https://www.loom.com/embed/${videoId}`;
}

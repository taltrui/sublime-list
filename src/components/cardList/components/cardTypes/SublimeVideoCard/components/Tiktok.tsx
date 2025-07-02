import { useEffect, useState } from "react";
import { getTikTokOEmbedData } from "../../../../../../lib/videos";
import { SiTiktok } from "@icons-pack/react-simple-icons";

interface TikTokEmbedProps {
  content: { url: string };
}

function TikTokEmbed({ content }: TikTokEmbedProps) {
  const [embedHtml, setEmbedHtml] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchEmbed = async () => {
      try {
        setLoading(true);
        setError(false);

        const data = await getTikTokOEmbedData(content.url);

        if (data && data.html) {
          setEmbedHtml(data.html);

          if (!document.querySelector('script[src*="tiktok.com/embed.js"]')) {
            const script = document.createElement("script");
            script.src = "https://www.tiktok.com/embed.js";
            script.async = true;
            document.body.appendChild(script);
          }
        } else {
          throw new Error("No embed data received");
        }
      } catch (err) {
        console.error("TikTok embed error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEmbed();
  }, [content.url]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 bg-black rounded-lg">
        <div className="w-8 h-8 border-2 border-gray-600 border-t-white rounded-full animate-spin mb-3"></div>
        <p className="text-sm text-white">Loading TikTok video...</p>
      </div>
    );
  }

  if (error || !embedHtml) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 ">
        <div className="text-4xl mb-3">
          <SiTiktok />
        </div>
        <p className="text-sm font-medium  mb-2">
          We can't reproduce this here.
        </p>
        <a
          href={content.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-red-400 hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          Watch on TikTok
        </a>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div
        className="tiktok-embed max-w-sm"
        dangerouslySetInnerHTML={{ __html: embedHtml }}
      />
    </div>
  );
}

export default TikTokEmbed;

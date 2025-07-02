import { useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";

function NavigationLoader() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const unsubscribeBeforeLoad = router.subscribe('onBeforeLoad', () => {
      setIsNavigating(true);
    });

    const unsubscribeLoad = router.subscribe('onLoad', () => {
      timeoutId = setTimeout(() => {
        setIsNavigating(false);
      }, 200);
    });

    return () => {
      unsubscribeBeforeLoad();
      unsubscribeLoad();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [router]);

  if (!isNavigating) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div
        className="h-full bg-cyan-600 transition-all duration-300 ease-out"
        style={{
          animation: "progressBar 2s ease-out infinite",
        }}
      />
      <style>{`
        @keyframes progressBar {
          0% { width: 0%; }
          70% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}

export default NavigationLoader;

import { ItemSoldEvent } from "@opensea/stream-js";
import { useEffect, useState } from "react";

const isVideoFile = (url: string): boolean => {
  const videoExtensions = [".mp4", ".webm", ".ogg"];
  return videoExtensions.some((ext) => url.toLowerCase().endsWith(ext));
};

const NftMediaViewer = ({
  event,
  className,
}: {
  event: ItemSoldEvent;
  className?: string;
}) => {
  const [isVideoPlayable, setIsVideoPlayable] = useState(false);

  useEffect(() => {
    if (
      event.payload.item.metadata.animation_url &&
      isVideoFile(event.payload.item.metadata.animation_url)
    ) {
      setIsVideoPlayable(true);
    } else {
      setIsVideoPlayable(false);
    }
  }, [event]);

  return (
    <>
      {isVideoPlayable ? (
        <video
          className={className}
          controls
          autoPlay
          muted
          src={event.payload.item.metadata.animation_url!}
        />
      ) : (
        <img
          src={event.payload.item.metadata.image_url || "placeholder.jpg"}
          alt={event.payload.item.metadata.name || "Unnamed NFT"}
          className={className}
        />
      )}
    </>
  );
};

export default NftMediaViewer;

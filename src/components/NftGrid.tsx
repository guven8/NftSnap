import React from "react";
import { ItemSoldEvent } from "@opensea/stream-js";
import NftMediaViewer from "./NftMediaViewer";

interface NFTGridProps {
  events: ItemSoldEvent[];
  onSelectEvent: (event: ItemSoldEvent) => void;
}

const NFTGrid: React.FC<NFTGridProps> = ({ events, onSelectEvent }) => {
  const sortedEvents = [...events]
    .filter(
      (event) =>
        event.payload.item.metadata.animation_url ||
        event.payload.item.metadata.image_url
    )
    .sort(
      (a, b) => new Date(b.sent_at).getTime() - new Date(a.sent_at).getTime()
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {sortedEvents.map((event) => (
        <div
          key={event.payload.item.nft_id}
          onClick={() => onSelectEvent(event)}
          className="cursor-pointer bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <NftMediaViewer event={event} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold truncate">
              {event.payload.item.metadata.name || "Unnamed NFT"}
            </h3>
            <p className="text-gray-400 mt-2">
              Sold for{" "}
              <span className="text-yellow-400">
                {parseFloat(event.payload.payment_token.eth_price || "0")
                  .toFixed(6)
                  .replace(/\.?0+$/, "")}{" "}
                ETH
              </span>
            </p>
            <p className="text-gray-400 mt-1">
              (~$
              {parseFloat(event.payload.payment_token.usd_price || "0").toFixed(
                2
              )}
              )
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NFTGrid;

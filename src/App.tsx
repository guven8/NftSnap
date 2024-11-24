import { useEffect, useState } from "react";
import { ItemSoldEvent } from "@opensea/stream-js";
import { openSeaClient } from "./lib/openSea";

function App() {
  const [events, setEvents] = useState<ItemSoldEvent[]>([]);

  useEffect(() => {
    const client = openSeaClient();

    client.onItemSold("*", (event) => {
      console.log("Item sold:", event);
      setEvents((prevEvents) => [...prevEvents, event]);
    });

    return () => {
      client.disconnect();
    };
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="bg-gray-800 text-white py-4 shadow-md">
        <div className="max-w-1440 mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide">NFTIVERSE</h1>
        </div>
      </header>
      <main className="max-w-1440 mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
            >
              <img
                src={event.payload.item.metadata.image_url || "placeholder.jpg"}
                alt={event.payload.item.metadata.name || "Unnamed NFT"}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold truncate">
                  {event.payload.item.metadata.name || "Unnamed NFT"}
                </h3>
                <p className="text-gray-400 mt-2">
                  Sold for{" "}
                  <span className="text-yellow-400">
                    {event.payload.payment_token.eth_price || "0.0"} ETH
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;

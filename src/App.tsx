import { useEffect, useState } from "react";
import { ItemSoldEvent } from "@opensea/stream-js";
import { openSeaClient } from "./lib/openSea";
import Modal from "./components/Modal";
import NftMediaViewer from "./components/NftMediaViewer";

function App() {
  const [events, setEvents] = useState<ItemSoldEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<ItemSoldEvent | null>(
    null
  );

  useEffect(() => {
    const handleError = (error: any) => {
      console.error("OpenSea Stream Error:", error);
      setError("Failed to connect to OpenSea. Please try again later.");
      setIsLoading(false);
    };

    const client = openSeaClient(handleError);

    try {
      client.onItemSold("*", (event) => {
        console.log("Item sold:", event);
        setEvents((prevEvents) => [...prevEvents, event]);
        setIsLoading(false);
      });
    } catch (err) {
      handleError(err);
    }

    return () => {
      client.disconnect();
    };
  }, []);

  const closeModal = () => setSelectedEvent(null);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="bg-gray-800 text-white py-4 shadow-md">
        <div className="max-w-1440 mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide">Meta Mint</h1>
        </div>
      </header>
      <main className="max-w-1440 mx-auto px-4 py-8">
        {error && (
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        )}
        {!error && isLoading && (
          <div className="text-center text-gray-400">
            <p>Loading NFTs...</p>
          </div>
        )}
        {!isLoading && !error && events.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {events.map((event, index) => (
              <div
                key={index}
                onClick={() => setSelectedEvent(event)}
                className="cursor-pointer bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <NftMediaViewer
                  event={event}
                  className="w-full h-48 object-cover"
                />
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
                    {parseFloat(
                      event.payload.payment_token.usd_price || "0"
                    ).toFixed(2)}
                    )
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        {!isLoading && !error && events.length === 0 && (
          <div className="text-center text-gray-400">
            <p>No NFTs available at the moment.</p>
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedEvent && (
        <Modal isOpen={true} closeModal={closeModal}>
          <div className="bg-gray-800 text-white p-6 rounded-lg max-w-lg w-full shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">
              {selectedEvent.payload.item.metadata.name || "Unnamed NFT"}
            </h2>
            <NftMediaViewer
              event={selectedEvent}
              className="w-full h-64 object-cover rounded mb-4"
            />
            <p>
              <strong>Sold for:</strong>{" "}
              <span className="text-yellow-400">
                {parseFloat(
                  selectedEvent.payload.payment_token.eth_price || "0"
                )
                  .toFixed(6)
                  .replace(/\.?0+$/, "")}{" "}
                ETH
              </span>{" "}
              (~$
              {parseFloat(
                selectedEvent.payload.payment_token.usd_price || "0"
              ).toFixed(2)}
              )
            </p>
            <p>
              <strong>Collection:</strong>{" "}
              {selectedEvent.payload.collection.slug}
            </p>
            <p>
              <strong>Chain:</strong> {selectedEvent.payload.chain}
            </p>
            <p>
              <strong>Maker Address:</strong>{" "}
              <a
                href={`https://opensea.io/${selectedEvent.payload.maker.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                {selectedEvent.payload.maker.address}
              </a>
            </p>
            <p>
              <strong>Taker Address:</strong>{" "}
              <a
                href={`https://opensea.io/${selectedEvent.payload.taker.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                {selectedEvent.payload.taker.address}
              </a>
            </p>
            <p>
              <strong>Transaction:</strong>{" "}
              <a
                href={`https://blockscan.com/tx/${selectedEvent.payload.transaction.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                View on Explorer
              </a>
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;

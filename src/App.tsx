import { useEffect, useState } from "react";
import { ItemSoldEvent } from "@opensea/stream-js";
import { openSeaClient } from "./lib/openSea";
import NFTGrid from "./components/NftGrid";
import NFTModal from "./components/NftModal";
import NSFWWarning from "./components/NftWarning";

export const MAX_EVENTS = 100;

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

    const client = openSeaClient();

    try {
      client.onItemSold("*", (event) => {
        console.log("Item sold:", event);
        setEvents((prevEvents) => [event, ...prevEvents].slice(0, MAX_EVENTS));
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
    <>
      <NSFWWarning />
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
            <NFTGrid events={events} onSelectEvent={setSelectedEvent} />
          )}
          {!isLoading && !error && events.length === 0 && (
            <div className="text-center text-gray-400">
              <p>No NFTs available at the moment.</p>
            </div>
          )}
        </main>
        <NFTModal
          isOpen={!!selectedEvent}
          closeModal={closeModal}
          event={selectedEvent}
        />
      </div>
    </>
  );
}

export default App;

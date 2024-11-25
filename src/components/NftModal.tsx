import { ItemSoldEvent } from "@opensea/stream-js";
import Modal from "./Modal";
import NftMediaViewer from "./NftMediaViewer";

interface NFTModalProps {
  isOpen: boolean;
  closeModal: () => void;
  event: ItemSoldEvent | null;
}

const NFTModal: React.FC<NFTModalProps> = ({ isOpen, closeModal, event }) => {
  if (!isOpen || !event) return null;

  return (
    <Modal isOpen={true} closeModal={closeModal}>
      <div className="bg-gray-800 text-white p-6 rounded-lg max-w-lg w-full shadow-lg">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">
          {event.payload.item.metadata.name || "Unnamed NFT"}
        </h2>
        <NftMediaViewer
          event={event}
          className="w-full h-64 object-cover rounded mb-4"
        />
        <p>
          <strong>Sold for:</strong>{" "}
          <span className="text-yellow-400">
            {parseFloat(event.payload.payment_token.eth_price || "0")
              .toFixed(6)
              .replace(/\.?0+$/, "")}{" "}
            ETH
          </span>{" "}
          (~$
          {parseFloat(event.payload.payment_token.usd_price || "0").toFixed(2)})
        </p>
        <p>
          <strong>Collection:</strong> {event.payload.collection.slug}
        </p>
        <p>
          <strong>Chain:</strong> {event.payload.chain}
        </p>
        <p>
          <strong>Maker Address:</strong>{" "}
          <a
            href={`https://opensea.io/${event.payload.maker.address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            {event.payload.maker.address}
          </a>
        </p>
        <p>
          <strong>Taker Address:</strong>{" "}
          <a
            href={`https://opensea.io/${event.payload.taker.address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            {event.payload.taker.address}
          </a>
        </p>
        <p>
          <strong>Transaction:</strong>{" "}
          <a
            href={`https://blockscan.com/tx/${event.payload.transaction.hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            View on Explorer
          </a>
        </p>
      </div>
    </Modal>
  );
};

export default NFTModal;

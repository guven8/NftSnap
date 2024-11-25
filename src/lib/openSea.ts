import { OpenSeaStreamClient } from "@opensea/stream-js";
import { WebSocket as NodeWebSocket } from "ws";

export const openSeaClient = (onError?: (error: any) => void) => {
  const API_KEY = import.meta.env.VITE_OPENSEA_API_KEY;

  return new OpenSeaStreamClient({
    token: API_KEY,
    connectOptions: {
      WebSocket: NodeWebSocket,
    },
    onError(error) {
      onError?.(error);
    },
  });
};

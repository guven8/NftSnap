# MetaMint

MetaMint is a real-time NFT marketplace tracker that showcases the latest NFT sales. Powered by OpenSea's WebSocket API.

[Visit the website here!](https://metamint-9sts.vercel.app/)

---

## Features

- **Live Updates:** Real-time NFT sale events.

---

## Screenshot

![MetaMint Homepage](./src/assets/homePage.png)

---

## Getting Started

### Prerequisites

- Obtain an OpenSea API Key from [OpenSea's API Documentation](https://docs.opensea.io/reference/api-keys). This key is required to connect to the OpenSea API.

---

### Development

To run the app in development mode:

```bash
npm run init
```

This will create a .env.local file. Open the file and replace placeholders with your actual environment variables, including your OpenSea API Key:

```bash
VITE_OPENSEA_API_KEY=your-api-key-here
```

Start the development server:

```bash
npm run dev
```

The app will be available at http://localhost:5173

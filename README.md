# 🔍 VERI-AI

**VERI-AI** is a **Web3-powered verification platform** built on **StarkNet**.  
It helps users verify the authenticity and ownership of **digital and physical assets** (like certificates, land documents, or NFTs) using blockchain transparency and AI validation.

Our mission is to make **trust verification simple, secure, and tamper-proof**.

---

## ⚙️ Built With

VERI-AI is built using the **Scaffold-Stark** framework — an open-source toolkit for rapidly building and deploying decentralized applications on **StarkNet**.

### Core Technologies
- **Next.js** – frontend and app routing
- **Starknet.js** – blockchain interaction layer
- **Starknet-React** – React hooks for StarkNet
- **Scarb & Starknet Foundry** – Cairo build and testing toolchain

---

## ✨ Key Features

- 🧠 **AI-Powered Validation:** Use intelligent models to verify authenticity of data or documents.
- 🔗 **Blockchain Transparency:** Each verification is logged immutably on StarkNet.
- 🪪 **Asset Authentication:** Verify certificates, land titles, or NFTs with proof of ownership.
- 🧱 **Reusable Components:** Modular Web3-ready components built with Scaffold-Stark.
- 🔥 **Prefunded Test Accounts:** Seamless testing with burner wallets.
- 🔐 **Wallet Integration:** Connect and verify assets with supported StarkNet wallets.

---

![Debug Contracts tab](./packages/nextjs/public/debug-image.png)

---

## 🧰 Developer Setup

### 0. Requirements

Before starting, install the following:

- [Node.js (>= v22)](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/getting-started/install)
- [Git](https://git-scm.com/downloads)

---

### 1. Install Developer Tools

You can install tools **natively** or using **Dev Containers (Docker)**.

#### Option 1: Native Installation

Install all StarkNet essentials using [**Starkup**](https://github.com/software-mansion/starkup):

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.starkup.sh | sh

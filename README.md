# Decentralized Payment System for College Campus
What is this project used for
This project is a decentralized payment system designed for a college campus.
It allows students to make digital payments for campus services such as canteen, events, or other facilities using blockchain technology instead of a centralized payment system.
The main goal is to reduce dependency on a single authority and provide secure, transparent, and tamper-proof transactions within the campus.

# How to use the project.
1) Connect a blockchain wallet (for example MetaMask) to the application
2) Select the campus service or vendor
3) Enter the payment amount
4) Confirm the transaction from the wallet
5)The transaction is recorded on the blockchain and the vendor receives the payment

# Installation and Dependencies
To run the project locally, follow these steps:
$ Prerequisites
1) Node.js
2) npm
3) MetaMask browser extension
4) Git

# BASH (STEPS) 
1) git clone <repository-url>
2) cd <project-folder>
3) npm install

# Run blockchain locally (if using Hardhat) 
npx hardhat node
# Deploy smart contract 
npx hardhat run scripts/deploy.js --network localhost
# Start frontend 
npm start

# Feature Upgradation (Future Work)
1) Integration with real crypto wallets
2) Support for real cryptocurrencies
3) Currency exchange integration using platforms like Binance
4) Automatic conversion between crypto and local currency
5) Improved user interface and transaction history

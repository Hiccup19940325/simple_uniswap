import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv';
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.5.16',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: '0.8.20',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: '0.6.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
    ],
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY
    }
  },
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      chainId: 11155111,
      url: "https://rpc.sepolia.ethpandaops.io",
      accounts: [process.env.PRIVATE_KEY],
      gas: 21000000,
      gasPrice: 8000000000
    }
  }
};

export default config;

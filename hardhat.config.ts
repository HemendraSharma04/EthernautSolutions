import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      { version: "0.8.17" },
      { version: "0.6.0" },
      { version: "0.8.0" },
    ],
  },

  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      // gasPrice: 320000000000, //30 gwei
    },
  },
};

export default config;

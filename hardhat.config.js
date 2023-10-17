require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    evmoslocal: {
      url: "http://127.0.0.1:8545",
      chainId: 9000,
      accounts: [process.env.ACCOUNT_KEY],
    },
  },
};

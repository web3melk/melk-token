require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async(taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: "0.8.20",
    networks: {
        mumbai: {
            url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_MUMBAI}`,
            chainId: 80001,
        },
        polygonAmoy: {
            url: `https://polygon-amoy.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_AMOY}`,
            chainId: 80002,
        },
        polygon: {
            url: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_POLYGON}`,
            chainId: 137,
        }
    },
    etherscan: {
      apiKey: {
          polygon: process.env.POLYGONSCAN_API_KEY,
          polygonAmoy: process.env.POLYGONSCAN_API_KEY,
          oklinkAmoy: process.env.OKLINK_API_KEY
      },
      customChains: [
        {
            network: "oklinkAmoy",
            chainId: 80002,
            urls: {
                apiURL: "https://www.oklink.com/api/v5/explorer/contract/verify-source-code-plugin/amoy_testnet",
                browserURL: "https://www.oklink.com/amoy",
            },
        },
        {
            network: "polygonAmoy",
            chainId: 80002,
            urls: {
                apiURL: "https://api-amoy.polygonscan.com/api",
                browserURL: "https://amoy.polygonscan.com",
            },
        },
      ],
    },
    sourcify: {
      // Disabled by default, set here to disable warning
      enabled: false
    }
};
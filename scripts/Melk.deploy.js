// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
async function deploy() {
    const hre = require("hardhat");
    const { LedgerSigner } = require("@anders-t/ethers-ledger");

    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    // Get ledger wallet
    const ledger = new LedgerSigner(hre.ethers.provider, process.env.LEDGER_WALLET);

    // We get the contract to deploy
    const Melk = await hre.ethers.getContractFactory("Melk");

    // Connect ledger to the contractFactory
    console.log('Open the Ethereum app on your ledger.')
    let contractFactory = await Melk.connect(ledger)

    // Deploy the contract
    const melk = await contractFactory.deploy();

    await melk.deployed();

    console.log("Melk deployed to:", melk.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deploy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
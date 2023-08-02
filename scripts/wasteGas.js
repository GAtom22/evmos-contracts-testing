// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script> --network <network-name>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const gasAmount = 500_000;

  const consumer = await hre.ethers.getContractFactory("GasConsumer");
  const contract = await consumer.deploy();

  console.log(`GasConsumer contract deployed at ${await contract.getAddress()}`)

  const tx = await contract.go(gasAmount);
  const receipt = await tx.wait(1);

  console.log(
    `Wasted ${gasAmount} of gas`
  );
  console.log("The transaction details are");
  console.log(receipt);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

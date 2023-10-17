// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script> --network <network-name>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // const amt = hre.ethers.parseEther("10");

  // const vestingContract = await hre.ethers.getContractFactory("SCVesting");
  // const contract = await vestingContract.deploy();

  // console.log(`SCVesting contract deployed at ${await contract.getAddress()}`);

  // const tx = await contract.deposit({ value: amt });
  // await tx.wait(1);

  // console.log(`Deposited ${amt} into the contract`);

  // ==================
  //      STAGE 2
  // ==================
  const contractAddr = "0x3B3b787CEF3Df6291815E20E92525B8F9f78844C";
  const contract = await hre.ethers.getContractAt("SCVesting", contractAddr);

  const tx = await contract.fundVestingFromContractWithtApproval(
    "0xD8B6c45Dfb4eb12881fB313ada51D43a54A0F898", //dev0
    1696825289,
    [[5000, [["aevmos", 10000000]]]],
    [[5000, [["aevmos", 10000000]]]]
  );
  await tx.wait(1);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

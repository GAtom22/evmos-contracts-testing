// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script> --network <network-name>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // =====================================
  //      STAGE 1 - deploy contract
  // =====================================

  const amt = hre.ethers.parseEther("10");

  const vestingContract = await hre.ethers.getContractFactory("SCVesting");
  const contract = await vestingContract.deploy();

  const contractAddr = await contract.getAddress()

  console.log(`SCVesting contract deployed at ${contractAddr}`);
  const [signer] = await hre.ethers.getSigners();

  console.log(`Sender balance ${hre.ethers.formatEther(await hre.ethers.provider.getBalance(signer))}`);

  const tx = await signer.sendTransaction({
    to: contractAddr,
    value: amt,
  });
  await tx.wait(1);
  
  console.log(`Deposited ${hre.ethers.formatEther(amt)} into the contract`);
  const contractBalance = await hre.ethers.provider.getBalance(contractAddr)
  // For some reason, the contract balance is not changed ??
  console.log(`Contract balance ${hre.ethers.formatEther(contractBalance)}`);
  
  console.log(`Sender balance ${hre.ethers.formatEther(await hre.ethers.provider.getBalance(signer))}`);
  // =========================================================
  //      STAGE 2 - call func after creating vesting acc
  // =========================================================
  // const contractAddr = "0x4C30084718f0aE977157B77669d6606CFb1b9CA2";
  // const contract = await hre.ethers.getContractAt("SCVesting", contractAddr);


  // const lockupPeriods = [
  //   { length: 5000, amount: [{ denom: "aevmos", amount: 1000 }] },
  // ];
  // const vestingPeriods = [
  //   { length: 5000, amount: [{ denom: "aevmos", amount: 1000 }] },
  // ];

  // const tx = await contract.fundVestingFromContractWithtApproval(
  //   "0xC6Fe5D33615a1C52c08018c47E8Bc53646A0E101", //dev0
  //   1686825289,
  //   lockupPeriods,
  //   vestingPeriods
  // );
  // await tx.wait(1);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script> --network <network-name>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // change here the address of the validator you want to stake to
  const valAddr = "evmosvaloper10jmp6sgh4cc6zt3e8gw05wavvejgr5pwlawghe";

  const stakeAmount = hre.ethers.parseEther("0.001");

  const staking = await hre.ethers.getContractAt(
    "StakingI",
    "0x0000000000000000000000000000000000000800"
  );

  const [signer] = await hre.ethers.getSigners();
  const tx = await staking.delegate(signer, valAddr, stakeAmount);
  const receipt = await tx.wait(1);

  console.log(
    `Staked ${ethers.formatEther(stakeAmount)} EVMOS with ${valAddr}`
  );

  const tx2 = await staking.undelegate(signer, valAddr, stakeAmount);
  await tx2.wait(1);

  console.log(
    `Undelegated ${ethers.formatEther(stakeAmount)} EVMOS from ${valAddr}`
  );

  const query = await staking.unbondingDelegation(signer, valAddr)
  console.log(query)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

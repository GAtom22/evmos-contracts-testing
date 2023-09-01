// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script> --network <network-name>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // change here the address of the validator you want to stake to
  const valAddr = "evmosvaloper19qays6qcacmtyzq86spuyrz56sl6lrf55nht68"; 
  
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
  console.log("The transaction details are");
  console.log(receipt);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

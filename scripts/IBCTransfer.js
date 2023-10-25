// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script> --network <network-name>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const amt = hre.ethers.parseEther("0.001");
  const receiver = "cro1qj4u2y23hx7plrztswrel2hgf8mh2m22k80fet";
  const precompile = await hre.ethers.getContractAt(
    "ICS20I",
    "0x0000000000000000000000000000000000000802"
  );

  const [signer] = await hre.ethers.getSigners();
  const tx = await precompile.transfer(
    "transfer",
    "channel-0",
    "aevmos",
    amt,
    signer.getAddress(),
    receiver,
    { revisionNumber: 1, revisionHeight: 10000000000 },
    0,
    ""
  );
  const receipt = await tx.wait(1);

  console.log(
    `Transferred ${ethers.formatEther(amt)} EVMOS via IBC to ${receiver}`
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

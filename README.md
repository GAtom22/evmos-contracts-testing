# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

To stake some tokens, follow these steps:

- create a `.env` file with your private key
- send some funds to your account
- run a node locally. Can use the `local_node.sh` on evmos repo.
- edit the corresponding validator address in the `scripts/stake.js`
- run the following command: `npx hardhat run scripts/stake.js --network evmoslocal`
- you can run the scripts against testnet or mainnet too. Just use the `--network` flag and specify `evmostestnet` or `evmosmainnet` correspondingly

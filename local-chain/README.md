# DefiBank SmartContract

This project is for develop a DefiBank contract, run EVM local-chain and write unit test for DefiBank contract.
* **Contract:** ./contracts/DefiBank.sol
* **UnitTest:** ./test/DefiBankTest.sol



Instruction for this project:

* **For compile smart contract:** 
```shell
$ npx hardhat compile
```

* **For run unit test smart contract:** 
```shell
$ npx hardhat test
```

* **Run hardhat node:** 
```shell
$ npx hardhat node
//or
$ yarn dev
```

* **Deploy contract to local network:** 
```shell
$ npx hardhat run scripts/deploy.ts --network localhost
```
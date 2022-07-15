import { ethers } from "hardhat";

async function main() {
  const tokenName = "10XToken";
  const symbol = "10X";
  const decimals = 0;

  const DefiBank = await ethers.getContractFactory("DefiBank");
  const defiBank = await DefiBank.deploy(tokenName, symbol, decimals);

  await defiBank.deployed();

  console.log("DefiBank deployed to:", defiBank.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

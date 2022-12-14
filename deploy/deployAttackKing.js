const hre = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();

  const Contract = await hre.ethers.getContractFactory("KingAttack");
  const ContractInstance = await Contract.deploy();
  await ContractInstance.deployed();

  console.log("contract address", ContractInstance.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

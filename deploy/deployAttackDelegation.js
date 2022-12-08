const hre = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();

  const Contract = await hre.ethers.getContractFactory("AttackDelegation");
  const ContractInstance = await Contract.connect(owner).deploy();
  await ContractInstance.deployed();

  console.log("attackDelegation address", ContractInstance.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

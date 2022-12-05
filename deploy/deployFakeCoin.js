const hre = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();

  const FakeContract = await hre.ethers.getContractFactory("FakeCoinFlip");
  const fakeContractInstance = await FakeContract.deploy();
  await fakeContractInstance.deployed();

  console.log("fakecoincontract address", fakeContractInstance.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

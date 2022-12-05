const hre = require("hardhat");

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

async function main() {
  const [owner] = await ethers.getSigners();
  const contractAddress = hre.ethers.utils.getAddress(
    "0xcC25f0E79481234b3AE7005E9BC28881ce7759e3"
  );

  const fakeContractAddress = hre.ethers.utils.getAddress(
    "0xE9bfAbA7eaA76D836D6E8b0Ac91d060ffb5d16Cf"
  );

  const Contract = await hre.ethers.getContractFactory("CoinFlip");
  const contractInstance = await Contract.attach(contractAddress);

  console.log(contractInstance.functions);

  const FakeContract = await hre.ethers.getContractFactory("FakeCoinFlip");
  const fakeContractInstance = await FakeContract.attach(fakeContractAddress);
  //   await fakeContractInstance.deployed();

  console.log("wins before", await contractInstance.consecutiveWins());

  let guess = await fakeContractInstance.connect(owner).checkguess();

  console.log("wins after", guess);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

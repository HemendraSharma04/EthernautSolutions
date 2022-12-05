hello:
	yarn hardhat run scripts/HelloEthernaut.js --network goerli 

fallback:
	yarn hardhat run scripts/Fallback.js --network goerli

fallout:
	yarn hardhat run scripts/Fallout.js --network goerli

coinflip:
	yarn hardhat run scripts/CoinFlip.js --network goerli

deploy_fakecoin:
	yarn hardhat run deploy/DeployFakeCoin.js --network goerli

telephone:
	yarn hardhat run scripts/telephone.js --network goerli
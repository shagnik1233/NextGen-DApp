const hre = require("hardhat");

async function main() {
  const ScholarshipSystem = await hre.ethers.getContractFactory("ScholarshipSystem");

  // Deploy the contract with 2 string arguments
  const contract = await ScholarshipSystem.deploy("Abhijit Biswas", "ICFAB235");

  // Wait for it to be deployed (this line was broken before)
  await contract.waitForDeployment();

  console.log(`Scholarship contract deployed to: ${contract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

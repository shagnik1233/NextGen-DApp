const { ethers } = require("ethers"); // ✅ Correct import
const hre = require("hardhat");

async function main() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // ✅ your latest deployed address
  const ScholarshipSystem = await hre.ethers.getContractAt("ScholarshipSystem", contractAddress);

  const accounts = await hre.ethers.getSigners();

  console.log("Registering Students...");
  
  await ScholarshipSystem.addStudent("0x70997970C51812dc3A010C7d01b50e0d17dc79C8", "Shagnik Shyam", "24IUT0040009");
  
  await ScholarshipSystem.addStudent("0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", "Aniket Bhattacharjee", "24IUT0040006");

  await ScholarshipSystem.addStudent("0x90F79bf6EB2c4f870365E785982E1f101E93b906", "Satyajit Das", "24IUT0040017");

  await ScholarshipSystem.addStudent("0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65", "Hritika Saha", "24IUT0030066");
 
  await ScholarshipSystem.addStudent("0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc", "Amisha Choudhury", "24IUT0030111");
  
  await ScholarshipSystem.addStudent("0x976EA74026E726554dB657fA54763abd0C3a0aa9", "Moiruma Aktar", "24IUT0030106");
  console.log("Students added ✅");

  const donor1 = ScholarshipSystem.connect(accounts[7]);
  const donor2 = ScholarshipSystem.connect(accounts[8]);

  console.log("Registering Donors...");
  await donor1.donate("Sukanya Saha", { value: ethers.parseEther("0.1") });
  await donor2.donate("Arnab Ghosh", { value: ethers.parseEther("0.1") });

  const metaMaskDonor1 = await hre.ethers.getSigner("0x14dC79964da2C08b23698B3D3cc7Ca32193d9955");
  const connectedDonor1 = ScholarshipSystem.connect(metaMaskDonor1);
  await connectedDonor1.donate("Sukanya Saha", { value: ethers.parseEther("0.1") });

  const metaMaskDonor2= await hre.ethers.getSigner("0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f");
  const connectedDonor2 = ScholarshipSystem.connect(metaMaskDonor2);
  await connectedDonor2.donate("Arnab Ghosh", { value: ethers.parseEther("0.1") });

  console.log("Donors added ✅");

  console.log("✅ Setup complete. You can now log in as any of these roles.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

require('dotenv').config();
const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = "0x561bcA45fb33Bb03e52C3a9f653fb17999aCbe6d";

const abi = [
    "function store(uint256 _value) public",
    "function retrieve() public view returns (uint256)"
];

async function main() {
    console.log("Connecting to contract...");
    const contract = new ethers.Contract(contractAddress, abi, wallet);

    console.log("Reading current value...");
    const currentValue = await contract.retrieve();
    console.log(`Current Value: ${currentValue.toString()}`);

    console.log("Writing new value (42)...");
    const tx = await contract.store(42);
    
    console.log(`Transaction sent! Hash: ${tx.hash}`);
    console.log("Waiting for confirmation...");
    
    // Ждем, пока транзакция попадет в блок
    await tx.wait();
    
    // --- ПРОВЕРКА ---
    console.log("Verifying new value...");
    const updatedValue = await contract.retrieve();
    console.log(`Updated Value: ${updatedValue.toString()}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

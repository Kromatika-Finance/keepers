import dotenv from "dotenv";
import Web3 from "web3";
import MONITOR_ABI from "../abis/arbitrum-abi.js";
dotenv.config();

const web3 = new Web3(process.env.ARBITRUM_RPC) 

var contract =  new web3.eth.Contract(MONITOR_ABI, process.env.ARBITRUM_MONITOR);

async function interactWithKeeper(){
    try{
        const receipt = await contract.methods.checkUpkeep("0x").call({
            from: "0x0000000000000000000000000000000000000000"
        });

        console.log(receipt);
        if(receipt.upkeepNeeded){
            const result = await contract.methods.performUpkeep(receipt.performData).encodeABI();
            console.log(result);
        }

    }
    catch(error){
        console.log("\n\n\n====================> ERROR: \n", error);
    }

}
//setInterval(interactWithKeeper, 60000);
interactWithKeeper();

//const MONITOR_ADDRESS = "0x90aE03F8A0f9942BA02aB6c45cf7e0b905a2DAD4";


// const MONITOR_ABI = [
//   { inputs: [], stateMutability: "nonpayable", type: "constructor" },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "batchSize",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "gasUsed",
//         type: "uint256",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "paymentPaid",
//         type: "uint256",
//       },
//       { indexed: false, internalType: "bytes", name: "data", type: "bytes" },
//     ],
//     name: "BatchProcessed",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "address",
//         name: "from",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "newValue",
//         type: "uint256",
//       },
//     ],
//     name: "BatchSizeChanged",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "address",
//         name: "from",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "address",
//         name: "newValue",
//         type: "address",
//       },
//     ],
//     name: "ControllerChanged",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "address",
//         name: "from",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "address",
//         name: "newValue",
//         type: "address",
//       },
//     ],
//     name: "KeeperChanged",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "address",
//         name: "from",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "newValue",
//         type: "uint256",
//       },
//     ],
//     name: "MonitorSizeChanged",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "tokenId",
//         type: "uint256",
//       },
//     ],
//     name: "MonitorStarted",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "tokenId",
//         type: "uint256",
//       },
//     ],
//     name: "MonitorStopped",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: false,
//         internalType: "address",
//         name: "from",
//         type: "address",
//       },
//       {
//         indexed: false,
//         internalType: "uint256",
//         name: "newValue",
//         type: "uint256",
//       },
//     ],
//     name: "UpkeepIntervalChanged",
//     type: "event",
//   },
//   {
//     inputs: [],
//     name: "KROM",
//     outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
//     stateMutability: "view",
//     type: "function",
//     constant: true,
//   },
//   {
//     inputs: [],
//     name: "batchSize",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//     constant: true,
//   },
//   {
//     inputs: [],
//     name: "controller",
//     outputs: [{ internalType: "address", name: "", type: "address" }],
//     stateMutability: "view",
//     type: "function",
//     constant: true,
//   },
//   {
//     inputs: [],
//     name: "factory",
//     outputs: [
//       { internalType: "contract IUniswapV3Factory", name: "", type: "address" },
//     ],
//     stateMutability: "view",
//     type: "function",
//     constant: true,
//   },
//   {
//     inputs: [],
//     name: "keeper",
//     outputs: [{ internalType: "address", name: "", type: "address" }],
//     stateMutability: "view",
//     type: "function",
//     constant: true,
//   },
//   {
//     inputs: [],
//     name: "lastUpkeep",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//     constant: true,
//   },
//   {
//     inputs: [],
//     name: "monitorSize",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//     constant: true,
//   },
//   {
//     inputs: [],
//     name: "orderManager",
//     outputs: [
//       { internalType: "contract IOrderManager", name: "", type: "address" },
//     ],
//     stateMutability: "view",
//     type: "function",
//     constant: true,
//   },
//   {
//     inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     name: "tokenIds",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//     constant: true,
//   },
//   {
//     inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     name: "tokenIndexPerTokenId",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//     constant: true,
//   },
//   {
//     inputs: [],
//     name: "upkeepInterval",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//     constant: true,
//   },
//   {
//     inputs: [
//       {
//         internalType: "contract IOrderManager",
//         name: "_orderManager",
//         type: "address",
//       },
//       {
//         internalType: "contract IUniswapV3Factory",
//         name: "_factory",
//         type: "address",
//       },
//       { internalType: "contract IERC20", name: "_KROM", type: "address" },
//       { internalType: "address", name: "_keeper", type: "address" },
//       { internalType: "uint256", name: "_batchSize", type: "uint256" },
//       { internalType: "uint256", name: "_monitorSize", type: "uint256" },
//       { internalType: "uint256", name: "_upkeepInterval", type: "uint256" },
//     ],
//     name: "initialize",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
//     name: "startMonitor",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
//     name: "stopMonitor",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [{ internalType: "bytes", name: "", type: "bytes" }],
//     name: "checkUpkeep",
//     outputs: [
//       { internalType: "bool", name: "upkeepNeeded", type: "bool" },
//       { internalType: "bytes", name: "performData", type: "bytes" },
//     ],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [{ internalType: "bytes", name: "performData", type: "bytes" }],
//     name: "performUpkeep",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [{ internalType: "uint256", name: "_batchSize", type: "uint256" }],
//     name: "setBatchSize",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       { internalType: "uint256", name: "_monitorSize", type: "uint256" },
//     ],
//     name: "setMonitorSize",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       { internalType: "uint256", name: "_upkeepInterval", type: "uint256" },
//     ],
//     name: "setUpkeepInterval",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [{ internalType: "address", name: "_controller", type: "address" }],
//     name: "changeController",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [{ internalType: "address", name: "_keeper", type: "address" }],
//     name: "changeKeeper",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "getTokenIdsLength",
//     outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
//     stateMutability: "view",
//     type: "function",
//     constant: true,
//   },
// ];
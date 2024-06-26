const { DefenderRelayProvider } = require("defender-relay-client/lib/web3");
const Web3 = require("web3");
const { Relayer } = require('defender-relay-client');

const MONITOR_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "batchSize",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "gasUsed",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "paymentPaid",
        type: "uint256",
      },
      { indexed: false, internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "BatchProcessed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newValue",
        type: "uint256",
      },
    ],
    name: "BatchSizeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newValue",
        type: "address",
      },
    ],
    name: "ControllerChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newValue",
        type: "address",
      },
    ],
    name: "KeeperChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newValue",
        type: "uint256",
      },
    ],
    name: "MonitorSizeChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "MonitorStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "MonitorStopped",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newValue",
        type: "uint256",
      },
    ],
    name: "UpkeepIntervalChanged",
    type: "event",
  },
  {
    inputs: [],
    name: "KROM",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "batchSize",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "controller",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "factory",
    outputs: [
      { internalType: "contract IUniswapV3Factory", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "keeper",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "lastUpkeep",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "monitorSize",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "orderManager",
    outputs: [
      { internalType: "contract IOrderManager", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "tokenIds",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "tokenIndexPerTokenId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "upkeepInterval",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "contract IOrderManager",
        name: "_orderManager",
        type: "address",
      },
      {
        internalType: "contract IUniswapV3Factory",
        name: "_factory",
        type: "address",
      },
      { internalType: "contract IERC20", name: "_KROM", type: "address" },
      { internalType: "address", name: "_keeper", type: "address" },
      { internalType: "uint256", name: "_batchSize", type: "uint256" },
      { internalType: "uint256", name: "_monitorSize", type: "uint256" },
      { internalType: "uint256", name: "_upkeepInterval", type: "uint256" },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
    name: "startMonitor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
    name: "stopMonitor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    name: "checkUpkeep",
    outputs: [
      { internalType: "bool", name: "upkeepNeeded", type: "bool" },
      { internalType: "bytes", name: "performData", type: "bytes" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes", name: "performData", type: "bytes" }],
    name: "performUpkeep",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_batchSize", type: "uint256" }],
    name: "setBatchSize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_monitorSize", type: "uint256" },
    ],
    name: "setMonitorSize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_upkeepInterval", type: "uint256" },
    ],
    name: "setUpkeepInterval",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_controller", type: "address" }],
    name: "changeController",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_keeper", type: "address" }],
    name: "changeKeeper",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getTokenIdsLength",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];
const MONITOR_ADDRESS = "0x90aE03F8A0f9942BA02aB6c45cf7e0b905a2DAD4";


exports.handler = async function (event) {
  const validUntil = new Date(Date.now() + 200 * 1000).toISOString();
  const provider = new DefenderRelayProvider(event, {
    speed: "fast",
    validUntil,
  });
  const relayer = new Relayer(event);
  const web3 = new Web3(provider);
  const targetGasPrice = await web3.eth.getGasPrice();
  
  console.log('targetGasPrice: ', targetGasPrice);

  const [from] = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(MONITOR_ABI, MONITOR_ADDRESS, {
    from,
  });
  const block = await web3.eth.getBlock("pending");

  const maxGasPrice = (targetGasPrice * 1.8).toFixed();
  console.log("Max gas price: " + maxGasPrice);
  const baseFee = Number(block.baseFeePerGas);
  console.log('baseFee: ', baseFee)
  console.log('from: ', from)
  const receipt = await contract.methods.checkUpkeep("0x").call({
      from: "0x0000000000000000000000000000000000000000",
      gasPrice: baseFee, // previously was 100000000
      gasLimit: maxGasPrice,
    });
  console.log("receipt:", receipt);
  
  const txs = await relayer.list({
  		since: new Date(Date.now() - 60 * 1000),
  		status: 'pending', // can be 'pending', 'mined', or 'failed'
  		limit: 5, // newest txs will be returned first
   });
  console.log('txs: ', txs);
  if (receipt.upkeepNeeded && txs.length == 0) {
    let estimateGas = await web3.eth.estimateGas({
      value: "0x0", // Only tokens
      data: contract.methods.performUpkeep(receipt.performData).encodeABI(),
      to: MONITOR_ADDRESS,
      gasPrice: maxGasPrice,
    });

    const safeEstimate = (estimateGas * 1.4).toFixed();
    console.log("safeEstimate:", safeEstimate);
    
    
     
  // return contract.methods.performUpkeep(receipt.performData).send(
    // {gasPrice: maxGasPrice, gas: safeEstimate}
  // { gasPrice: 100000000,
   //   gasLimit: safeEstimate,}
 //  ).then(function(receipt){
   //  return { tx: receipt.transactionHash };
   // });
    
   return relayer.sendTransaction({
   	 value: "0x0", // Only tokens
      data: contract.methods.performUpkeep(receipt.performData).encodeABI(),
      to: MONITOR_ADDRESS,
       from: from, 
       gasPrice: maxGasPrice,
       gasLimit: safeEstimate
     });

  }
};

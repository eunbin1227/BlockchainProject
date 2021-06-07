import web3 from './web3';

const address = 0x2E4879d3CC51d8a28769b18ca53c9a13C6a5970C;

const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name_",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol_",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "owner",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "p_identifier",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lender",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "starting_time",
				"type": "uint256"
			}
		],
		"name": "check_in",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "owner",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "p_identifier",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lender",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "end_time",
				"type": "uint256"
			}
		],
		"name": "check_out",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "owner",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "p_identifier",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "lender",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "Checkin",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "owner",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "p_identifier",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "lender",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "Checkout",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "identifier",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "platenum",
				"type": "uint256"
			}
		],
		"name": "give_plate_num",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "owner",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "idx",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lender",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "starting_time",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "end_time",
				"type": "uint256"
			}
		],
		"name": "pay",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "identifier",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "register",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "pname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "owner",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "identifier",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "quantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "fee",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "st",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "et",
				"type": "uint256"
			}
		],
		"name": "register_place",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export default new web3.eth.Contract(abi, address);

//copy & paste the functions to where you need them

//import contract from './contract.js';

registerAcount = (qID, metaAddr, plateNumber) => {
	const { register } = contract;
	const { give_plate_num} = contract;
	const { approve } = contract;
	const { transfer } = contract;
	register(
		Number(qID),
		metaAddr,
		{
			gas: 1000,
		},
		(err) => {
			if (err) console.error('Error! :', err);
			console.log('Address registered');
		}
	);
	give_plate_num(
		Number(qID),
		Number(plateNumber),
		{
			gas: 1000,
		},
		(err) => {
			if (err) console.error('Error! :', err);
			console.log('Plate number registered');
		}
	);
	approve(
		metaAddr,
		Number(1000000),
		{
			gas: 1000,
		},
		(err) => {
			if (err) console.error('Error! :', err);
			console.log('Approved 1M token for test');
		}
	);
	transfer(
		metaAddr,
		Number(1000000),
		{
			gas: 1000,
		},
		(err) => {
			if (err) console.error('Error! :', err);
			console.log('Transfered 1M token for test');
		}
	);
};

registerPlace = (name, location, qID, id, quantity, fee, start_t, end_t) => {
	const {register_place} = contract;
	register_place(
		String(name),
		String(location),
		Number(qID),
		Number(id),
		Number(quantity),
		Number(fee),
		Number(start_t),
		Number(end_t),
		{
			gas: 1000,
		},
		(err) => {
			if (err) console.error('Error! :', err);
			console.log('Place registered');
		}
	);
};

checkIn = (qID, id, qID2, start_t) => {
	const {check_in} = contract;
	check_in(
		Number(qID),
		Number(id),
		Number(qID2),
		Number(start_t),
		{
			gas: 1000,
		},
		(err) => {
			if (err) console.error('Error! :', err);
			console.log('Check In');
		}
	);
};

checkOut = (qID, id, qID2, end_t) => {
	const {check_out} = contract;
	check_out(
		Number(qID),
		Number(id),
		Number(qID2),
		Number(end_t),
		{
			gas: 1000,
		},
		(err) => {
			if (err) console.error('Error! :', err);
			console.log('Check Out');
		}
	);
};

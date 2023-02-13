export const ABI = [
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_loanUUID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_bidUUID",
				"type": "string"
			}
		],
		"name": "acceptBid",
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
				"internalType": "string",
				"name": "_uuid",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_bidId",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_rate",
				"type": "uint256"
			}
		],
		"name": "createBid",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_approver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_cids",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_loanUUID",
				"type": "string"
			}
		],
		"name": "createLoan",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllLoans",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "uuid",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "requestor",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "approver",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "verifiedByApprover",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "loanAmount",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "fileCID",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "uuid",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "bidder",
								"type": "address"
							},
							{
								"internalType": "uint256",
								"name": "bidAmount",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "rate",
								"type": "uint256"
							},
							{
								"internalType": "bool",
								"name": "accepted",
								"type": "bool"
							},
							{
								"internalType": "bool",
								"name": "repaid",
								"type": "bool"
							}
						],
						"internalType": "struct CredE.Bid[]",
						"name": "Bids",
						"type": "tuple[]"
					}
				],
				"internalType": "struct CredE.Loan[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "loansCreated",
		"outputs": [
			{
				"internalType": "string",
				"name": "uuid",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "requestor",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "verifiedByApprover",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "loanAmount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "fileCID",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_loanUUID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_bidUUID",
				"type": "string"
			}
		],
		"name": "repayLoan",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_loanUUID",
				"type": "string"
			}
		],
		"name": "verifyEntity",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract CredE {

    uint numberOfLoans;

    struct Bid{
        string uuid;
        address bidder;
        uint256 bidAmount;
        uint256 rate;
        bool accepted;
        bool repaid;
    }

    struct Loan{
        string uuid;
        address requestor; // person requesting funds
        address approver; // entity that has signed the order/invoice
        bool verifiedByApprover;
        uint256 loanAmount;
        string[] fileCID;
        uint256 numberOfBids;
        Bid[] Bids; 
    }

    Loan[] loansCreated;

    constructor(){}

    function createLoan(
        address _approver,
        uint256 _amount,
        string[] memory _cids,
        string memory _loanUUID
    )external returns(bool){
        Loan storage newLoan = loansCreated[numberOfLoans];
        newLoan.approver = _approver;
        newLoan.loanAmount = _amount;
        newLoan.requestor = msg.sender;
        newLoan.fileCID = _cids;
        newLoan.uuid = _loanUUID;
        numberOfLoans++;
        return true;
    }

    function getAllLoans()
        public 
        view 
        returns(Loan[] memory _loans){
        _loans = loansCreated;
    }

    function createBid(
        string memory _uuid,
        string memory _bidId,
        uint256 _amount,
        uint256 _rate   
    )external payable returns(bool){

        for(uint256 i = 0; i <= numberOfLoans; i++){
            if(keccak256(abi.encodePacked(loansCreated[i].uuid)) == keccak256(abi.encodePacked(_uuid))){
                require(msg.value >= _amount, "Insufficient Amount");
                loansCreated[i].Bids[loansCreated[i].numberOfBids] = Bid(_bidId, msg.sender, _amount, _rate, false, false);
                loansCreated[i].numberOfBids++;
                return true;
            }
        }
        return false;
    }

    function acceptBid(
        string memory _loanUUID,
        string memory _bidUUID
    )external returns(bool){
        for(uint256 i = 0; i <= numberOfLoans; i++){
            if(keccak256(abi.encodePacked(loansCreated[i].uuid)) == keccak256(abi.encodePacked(_loanUUID))){
                for(uint256 x = 0; x <= loansCreated[i].numberOfBids; x++){
                    if(keccak256(abi.encodePacked(loansCreated[i].Bids[x].uuid)) == keccak256(abi.encodePacked(_bidUUID))){
                        loansCreated[i].Bids[x].accepted = true;
                        sendMoney(loansCreated[i].requestor, loansCreated[i].Bids[x].bidAmount);
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function sendMoney(address to, uint value) public {
        address payable receiver = payable(to);
        receiver.transfer(value);
    }

    function verifyEntity(string memory _loanUUID)external returns(bool){
        for(uint256 i = 0; i <= numberOfLoans; i++){
            if(keccak256(abi.encodePacked(loansCreated[i].uuid)) == keccak256(abi.encodePacked(_loanUUID))){
                loansCreated[i].verifiedByApprover = true;
                return true;
            }
        }
        return false;
    }

    function repayLoan(
        string memory _loanUUID,
        string memory _bidUUID
    )external payable returns(bool){
        for(uint256 i = 0; i <= numberOfLoans; i++){
            if(keccak256(abi.encodePacked(loansCreated[i].uuid)) == keccak256(abi.encodePacked(_loanUUID))){
                for(uint256 x = 0; x <= loansCreated[i].numberOfBids; x++){
                    if(keccak256(abi.encodePacked(loansCreated[i].Bids[x].uuid)) == keccak256(abi.encodePacked(_bidUUID))){
                        require(loansCreated[i].Bids[x].accepted == true, "Not accepted");
                        require(msg.value > (loansCreated[i].Bids[x].bidAmount + loansCreated[i].Bids[x].rate), "Insuffienct payment");
                        loansCreated[i].Bids[x].accepted = true;
                        sendMoney(loansCreated[i].requestor, loansCreated[i].Bids[x].bidAmount);
                        return true;
                    }
                }
            }
        }
        return false;
    }

}
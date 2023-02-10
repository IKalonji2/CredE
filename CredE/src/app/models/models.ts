import { v4 as uuid } from 'uuid';

class Loan {
    uuid: string = '';
    owner: string = '';
    ownerAddress: string = '';
    approverAddress: string = '';
    description: string = '';

    requestedAmount: number = 0;
    loanedAmount: number = 0;
    payedAmount: number = 0;
    interestAmount: number = 0;

    active: boolean = false;
    approved: boolean = false;
    rejected: boolean = false;
    fulfilled: boolean = false;
    repayed: boolean = false;
    
    documents: string[] = [];
    bids: Bid[] = [];

    constructor(owner: string = 'Owner', ownerAddress: string = '', approverAddress: string = '',
        requestedAmount: number = 0, documents: string[] = []) {
        this.uuid = uuid();
        this.owner = owner ? owner : 'Owner';
        this.ownerAddress = ownerAddress;
        this.approverAddress = approverAddress;
        this.requestedAmount = requestedAmount;
        this.documents = documents;
        this.active = true;
    }

    calculate() {
        this.bids.forEach(bid => {
            this.loanedAmount += bid.accepted ? bid.bidAmount : 0;
            this.payedAmount += bid.accepted ? bid.payedAmount : 0;
        });
    }
}

class Bid {
    uuid: string = '';
    ownerAddress: string = '';

    interestRate: number = 0;
    bidAmount: number = 0;
    interestAmount: number = 0;
    repaymentAmount: number = 0;
    payedAmount: number = 0;

    accepted: boolean = false;
    rejected: boolean = false;
    active: boolean = false;
    repayed: boolean = false;

    constructor(ownerAddress: string, bidAmount: number, interestRate: number) {
        this.uuid = uuid();
        this.ownerAddress = ownerAddress;
        this.bidAmount = bidAmount;
        this.interestRate = interestRate;
        this.active = true;
        this.calculate();
    }

    calculate() {
        this.interestAmount = this.bidAmount * this.interestRate / 100;
        this.repaymentAmount = this.bidAmount + this.interestAmount;
    }
}

export {
    Loan, Bid
}
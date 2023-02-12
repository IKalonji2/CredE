import { v4 as uuid } from 'uuid';

class Loan {
    uuid: string = '';
    owner: string = '';
    ownerAddress: string = '';
    approverAddress: string = '';
    description: string = '';

    requestedAmount: number = 0;
    loanedAmount: number = 0;
    paidAmount: number = 0;
    repaymentAmount: number = 0;
    interestAmount: number = 0;

    active: boolean = false;
    approved: boolean = false;
    rejected: boolean = false;
    fulfilled: boolean = false;
    repaid: boolean = false;
    
    documents: any[] = [];
    bids: Bid[] = [];

    constructor(owner: string = 'Owner', ownerAddress: string = '', approverAddress: string = '',
        requestedAmount: number = 0, documents: any[] = []) {
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
            this.paidAmount += bid.accepted ? bid.paidAmount : 0;
            this.repaymentAmount += bid.accepted ? bid.repaymentAmount : 0;
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
    paidAmount: number = 0;

    accepted: boolean = false;
    rejected: boolean = false;
    active: boolean = false;
    repaid: boolean = false;

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

    accept() {
        this.accepted = true;
        this.rejected = false;
        this.active = true;
        this.calculate();
    }

    reject() {
        this.accepted = false;
        this.rejected = true;
        this.active = false;
    }

    repay(amount: number) {
        this.paidAmount += amount;
        if(this.paidAmount >= this.repaymentAmount) {
            this.repaid = true;
            this.active = false;
        }
    }
}

export {
    Loan, Bid
}
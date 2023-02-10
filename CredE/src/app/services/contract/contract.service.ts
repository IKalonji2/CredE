import { Injectable } from '@angular/core';
import { Bid, Loan } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  loans: Loan[] = [new Loan()];
  sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  constructor() { }

  async getLoans() {
    await this.sleep(2000);
    return this.loans;
  }

  async createLoan(owner: string, ownerAddress: string, approverAddress: string, loanedAmount: number, documents: string[]) {
    this.loans.push(new Loan(owner, ownerAddress, approverAddress, loanedAmount, documents));
    await this.sleep(2000);
  }

  async bid(uuidLoan: string, ownerAddress: string, bidAmount: number, interestRate: number) {
    let bid = new Bid(ownerAddress, bidAmount, interestRate);
    let loanIndex = this.loans.findIndex(loan => loan.uuid == uuidLoan);
    if(loanIndex > -1) {
      this.loans[loanIndex].bids.push(bid);
    }
    await this.sleep(2000);
  }

  async acceptBid(uuidLoan: string, uuidBid: string) {
    let loanIndex = this.loans.findIndex(loan => loan.uuid == uuidLoan);
    if(loanIndex > -1) {
      let bidIndex = this.loans[loanIndex].bids.findIndex(bid => bid.uuid == uuidBid);
      if(bidIndex > -1) {
        this.loans[loanIndex].loanedAmount += this.loans[loanIndex].bids[bidIndex].accepted ? 0 : this.loans[loanIndex].bids[bidIndex].bidAmount;
        this.loans[loanIndex].interestAmount += this.loans[loanIndex].bids[bidIndex].accepted ? 0 : this.loans[loanIndex].bids[bidIndex].interestAmount;
        this.loans[loanIndex].bids[bidIndex].accepted = true;
        this.loans[loanIndex].bids[bidIndex].rejected = false;
        this.loans[loanIndex].bids[bidIndex].active = true;
      }
    }
    await this.sleep(2000);
  }

  async rejectBid(uuidLoan: string, uuidBid: string) {
    console.log('Bid Rejected');
    let loanIndex = this.loans.findIndex(loan => loan.uuid == uuidLoan);
    if(loanIndex > -1) {
      let bidIndex = this.loans[loanIndex].bids.findIndex(bid => bid.uuid == uuidBid);
      if(bidIndex > -1) {
        this.loans[loanIndex].bids[bidIndex].accepted = false;
        this.loans[loanIndex].bids[bidIndex].rejected = true;
        this.loans[loanIndex].bids[bidIndex].active = false;
        console.log(this.loans[loanIndex].bids[bidIndex]);
      }
    }
    await this.sleep(2000);
  }
}

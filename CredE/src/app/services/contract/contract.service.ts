import { Injectable } from '@angular/core';
import { Bid, Loan } from 'src/app/models/models';
import { FileService } from '../file/file.service';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  loans: Loan[] = [new Loan()];
  sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  constructor(private fileService: FileService) { }

  async getLoans() {
    await this.sleep(3000);
    return this.loans;
  }

  async createLoan(owner: string, ownerAddress: string, approverAddress: string, loanedAmount: number, documents: any[]) {
    let file: any = [];
    let docs: any = [];
    if(documents.length) {
      documents.forEach(async doc => {
        file.push(doc);
        await this.fileService.uploadFile(file).then(async cid => {
          docs.push({ name: file[0].name, cid: cid });
          this.loans.push(new Loan(owner, ownerAddress, approverAddress, loanedAmount, docs));
          file = [];
        });
      });
    } else {
      this.loans.push(new Loan(owner, ownerAddress, approverAddress, loanedAmount, docs));
    }
    await this.sleep(3000);
  }

  async bid(uuidLoan: string, ownerAddress: string, bidAmount: number, interestRate: number) {
    let bid = new Bid(ownerAddress, bidAmount, interestRate);
    let loanIndex = this.loans.findIndex(loan => loan.uuid == uuidLoan);
    if(loanIndex > -1) {
      this.loans[loanIndex].bids.push(bid);
    }
    await this.sleep(3000);
  }

  async approveLoan(uuidLoan: string) {
    let loanIndex = this.loans.findIndex(loan => loan.uuid == uuidLoan);
    if(loanIndex > -1) {
      this.loans[loanIndex].approved = true;
    }
    await this.sleep(3000);
  }

  async acceptBid(uuidLoan: string, uuidBid: string) {
    let loanIndex = this.loans.findIndex(loan => loan.uuid == uuidLoan);
    if(loanIndex > -1) {
      let bidIndex = this.loans[loanIndex].bids.findIndex(bid => bid.uuid == uuidBid);
      if(bidIndex > -1) {
        this.loans[loanIndex].bids[bidIndex].accept();
        this.loans[loanIndex].calculate();
      }
    }
    await this.sleep(3000);
  }

  async rejectBid(uuidLoan: string, uuidBid: string) {
    let loanIndex = this.loans.findIndex(loan => loan.uuid == uuidLoan);
    if(loanIndex > -1) {
      let bidIndex = this.loans[loanIndex].bids.findIndex(bid => bid.uuid == uuidBid);
      if(bidIndex > -1) {
        this.loans[loanIndex].bids[bidIndex].reject();
      }
    }
    await this.sleep(3000);
  }

  async repayBid(uuidLoan: string, uuidBid: string, amount: number) {
    let loanIndex = this.loans.findIndex(loan => loan.uuid == uuidLoan);
    if(loanIndex > -1) {
      let bidIndex = this.loans[loanIndex].bids.findIndex(bid => bid.uuid == uuidBid);
      if(bidIndex > -1) {
        this.loans[loanIndex].bids[bidIndex].repay(amount);
        this.loans[loanIndex].paidAmount += amount;
        if(this.loans[loanIndex].paidAmount >= this.loans[loanIndex].repaymentAmount) {
          this.loans[loanIndex].repaid = true;
        }
      }
    }
    await this.sleep(3000);
  }
}

import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Bid, Loan } from 'src/app/models/models';
import { ContractService } from 'src/app/services/contract/contract.service';
import { FileService } from 'src/app/services/file/file.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent {
  loans: Loan[] = [];
  address: string = '5FZsdofeuGbwh7CN6J4ksnmx2znPXu4TQwoK4hJkpSmgC6fy';
  currency: string = 'Roc';
  files: any = [];

  showRequestDialog: boolean = false;
  showManageDialog: boolean = false;
  showRepayDialog: boolean = false;

  constructor(
    private confirmationService: ConfirmationService,
    private contractService: ContractService,
    private fileService: FileService) {}

  async ngOnInit() {
    this.showSpinner();
    await this.contractService.getLoans().then((data: Loan[]) => this.loans = data);
    this.hideSpinner();
  }

  async requestFunds(owner: string, approverAddress: string, amount: string) {
    this.confirmationService.confirm({
      header: 'Confirm Loan Request',
      message: 'Are you sure you want to request for this loan?',
      accept: async () => {
        this.showSpinner();
        await this.contractService.createLoan(owner, this.address, approverAddress, +amount, this.files);
        this.hideSpinner();
      }
    });
    this.toggleRequestDialog();
  }

  async approveLoan(uuidLoan: string) {
    this.confirmationService.confirm({
      header: 'Approve Loan',
      message: 'Are you sure you want to approve the loan?',
      accept: async () => {
        this.showSpinner();
        await this.contractService.approveLoan(uuidLoan);
        this.hideSpinner();
      },
      reject: () => {
        console.log("Rejected!");
      }
    });
  }

  async bid(uuidLoan: string, amount: string, interest: string) {
    this.confirmationService.confirm({
      header: 'Confirm Funds',
      message: 'Are you sure you want to make a bid?',
      accept: async () => {
        this.showSpinner();
        await this.contractService.bid(uuidLoan, this.address, +amount, +interest);
        this.hideSpinner();
      },
      reject: () => {
        console.log("Rejected!");
      }
    });
  }

  async acceptBid(uuidLoan: string, uuidBid: string) {
    this.confirmationService.confirm({
      header: 'Accept Bid',
      message: 'Are you sure you want to accept the bid?',
      accept: async () => {
        this.showSpinner();
        await this.contractService.acceptBid(uuidLoan, uuidBid);
        this.hideSpinner();
      },
      reject: () => {
        console.log("Rejected!");
      }
    });
  }

  async rejectBid(uuidLoan: string, uuidBid: string) {
    this.confirmationService.confirm({
      header: 'Reject Bid',
      message: 'Are you sure you want to reject the bid?',
      accept: async () => {
        this.showSpinner();
        await this.contractService.rejectBid(uuidLoan, uuidBid);
        this.hideSpinner();
      },
      reject: () => {
        console.log("Rejected!");
      }
    });
  }

  async repayBid(uuidLoan: string, uuidBid: string, amount: number) {
    this.confirmationService.confirm({
      header: 'Repay Bid',
      message: 'Are you sure you want to repay the bid?',
      accept: async () => {
        this.showSpinner();
        await this.contractService.repayBid(uuidLoan, uuidBid, amount);
        this.hideSpinner();
      },
      reject: () => {
        console.log("Rejected!");
      }
    });
  }

  uploadFiles(event: any) {
    event.files.forEach((file: any) => {
      this.files.push(file);
    });
  }

  async downloadFile(cid: string) {
    this.showSpinner();
    await this.fileService.downloadFile(cid);
    this.hideSpinner();
  }

  toggleManageDialog() {
    if(this.showManageDialog) {
      this.showManageDialog = false;
    } else {
      this.showManageDialog = true;
    }
  }

  toggleRequestDialog() {
    if(this.showRequestDialog) {
      this.showRequestDialog = false;
    } else {
      this.showRequestDialog = true;
    }
  }

  toggleRepayDialog() {
    if(this.showRepayDialog) {
      this.showRepayDialog = false;
    } else {
      this.showRepayDialog = true;
    }
  }

  hasLoan() {
    return (this.loans.findIndex(loan => loan.ownerAddress == this.address) != -1);
  }

  hasBid() {
    for(let loan of this.loans) {
      if(loan.bids.findIndex(bid => bid.ownerAddress == this.address) != -1) {
        return true;
      }
    }
    return false;
  }

  hasLoanApprove() {
    return (this.loans.findIndex(loan => loan.approverAddress == this.address) != -1);
  }

  showSpinner() {
    document.getElementById("spinner")!.style.display = 'block';
  }

  hideSpinner() {
    document.getElementById("spinner")!.style.display = 'none';
  }
}

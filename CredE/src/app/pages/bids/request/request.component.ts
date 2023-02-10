import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Loan } from 'src/app/models/models';
import { ContractService } from 'src/app/services/contract/contract.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent {
  requests: Loan[] = [];
  address: string = '5FZsdofeuGbwh7CN6J4ksnmx2znPXu4TQwoK4hJkpSmgC6fy';
  currency: string = 'Roc';

  showRequestDialog: boolean = false;

  constructor(
    private confirmationService: ConfirmationService,
    private contractService: ContractService) {}

  async ngOnInit() {
    await this.contractService.getLoans().then((data: Loan[]) => this.requests = data);
  }

  async bid(uuidLoan: string, amount: string, interest: string) {
    this.confirmationService.confirm({
      header: 'Confirm Funds',
      message: 'Are you sure you want to make a bid?',
      accept: async () => {
        await this.contractService.bid(uuidLoan, this.address, +amount, +interest);
      },
      reject: () => {
        console.log("Rejected!");
      }
    });
  }

  async acceptBid(uuidLoan: string, uuidBid: string, bidAmount: number, interestRate: number) {
    this.confirmationService.confirm({
      header: 'Accept Funds',
      message: `Do you accept the bid of ${bidAmount} ${this.currency} at an interest of ${interestRate}?`,
      accept: async () => {
        await this.contractService.acceptBid(uuidLoan, uuidBid);
      },
      reject: () => {
        console.log("Rejected!");
      }
    });
  }

  async rejectBid(uuidLoan: string, uuidBid: string, bidAmount: number, interestRate: number) {
    this.confirmationService.confirm({
      header: 'Accept Funds',
      message: `Are you sure you want to reject a bid of ${bidAmount} ${this.currency} at an interest of ${interestRate}?`,
      accept: async () => {
        await this.contractService.rejectBid(uuidLoan, uuidBid);
      },
      reject: () => {
        console.log("Rejected!");
      }
    });
  }

  async requestFunds(owner: string, approverAddress: string, amount: string) {
    this.confirmationService.confirm({
      header: 'Confirm Loan Request',
      message: 'Are you sure you want to request for this loan?',
      accept: async () => {
        await this.contractService.createLoan(owner, this.address, approverAddress, +amount, []);
      }
    })
    this.toggleRequestDialog();
  }

  toggleRequestDialog() {
    if(this.showRequestDialog) {
      this.showRequestDialog = false;
    } else {
      this.showRequestDialog = true;
    }
  }
}

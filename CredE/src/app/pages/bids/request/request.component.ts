import { Component } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent {
  bids: any = [
    "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a"
  ];

  showRequestDialog: boolean = false;

  constructor(private confirmationService: ConfirmationService) {}

  async fund(address: string, name: string, amount: string) {
    this.confirmationService.confirm({
      header: 'Confirm Funds',
      message: `Are you sure you want to send, ${amount} Roc to ${name}, with address, '${address}'`,
      accept: () => {
        console.log("Funded...");
      },
      reject: () => {
        console.log("Rejected!");
      }
    });
  }

  async requestFunds() {
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BidsRoutingModule } from './bids-routing.module';
import { DebitComponent } from './debit/debit.component';
import { CreditComponent } from './credit/credit.component';
import { RequestComponent } from './request/request.component';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { BidsComponent } from './bids.component';


@NgModule({
  declarations: [
    DebitComponent,
    CreditComponent,
    RequestComponent,
    BidsComponent
  ],
  imports: [
    CommonModule,
    BidsRoutingModule,
    ButtonModule,
    MenubarModule,
    InputTextModule,
    CardModule,
    ConfirmDialogModule,
    DialogModule
  ]
})
export class BidsModule { }

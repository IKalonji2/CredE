import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BidsComponent } from './bids.component';
import { CreditComponent } from './credit/credit.component';
import { DebitComponent } from './debit/debit.component';
import { RequestComponent } from './request/request.component';

const routes: Routes = [
  { path: '', component: BidsComponent, children: [
    { path: 'credit', component: CreditComponent },
    { path: 'debit', component: DebitComponent },
    { path: '', component: RequestComponent, pathMatch: 'full' }
  ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BidsRoutingModule { }

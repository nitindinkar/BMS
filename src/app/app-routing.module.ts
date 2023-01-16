import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BudgetAllocationComponent } from './budget-allocation/budget-allocation.component';
import { BudgetUpdateComponent } from './budget-update/budget-update.component';
import { BudgetDeleteComponent } from './budget-delete/budget-delete.component';
import { InboxComponent } from './inbox/inbox.component';
import { OutboxComponent } from './outbox/outbox.component';
import { BudgetApproverComponent } from './budget-approver/budget-approver.component';
import { LoginComponent } from './login/login.component';
import { NewContigentBillComponent } from './new-contigent-bill/new-contigent-bill.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { BudgetAllocationReportComponent } from './budget-allocation-report/budget-allocation-report.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'budget-allocation', component: BudgetAllocationComponent },
  { path: 'budget-update', component: BudgetUpdateComponent },
  { path: 'budget-delete', component: BudgetDeleteComponent },
  { path: 'inbox', component: InboxComponent },
  { path: 'outbox', component: OutboxComponent },
  { path: 'budget-approval', component: BudgetApproverComponent },
  { path: 'new-contigentbill', component: NewContigentBillComponent },
  { path: 'manage-user', component: ManageUserComponent },
  { path: 'budget-allocation-report', component: BudgetAllocationReportComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
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
import { ContigentBillApproverComponent } from './contigent-bill-approver/contigent-bill-approver.component';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    BudgetAllocationComponent,
    BudgetUpdateComponent,
    BudgetDeleteComponent,
    InboxComponent,
    OutboxComponent,
    BudgetApproverComponent,
    LoginComponent,
    NewContigentBillComponent,
    ManageUserComponent,
    ContigentBillApproverComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

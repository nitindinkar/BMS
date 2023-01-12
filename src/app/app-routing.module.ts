import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BudgetAllocationComponent } from './budget-allocation/budget-allocation.component';
import { BudgetUpdateComponent } from './budget-update/budget-update.component';
import { BudgetDeleteComponent } from './budget-delete/budget-delete.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'budget-allocation', component: BudgetAllocationComponent },
  { path: 'budget-update', component: BudgetUpdateComponent },
  { path: 'budget-delete', component: BudgetDeleteComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

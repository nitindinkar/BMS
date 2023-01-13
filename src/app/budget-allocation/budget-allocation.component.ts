import { Component, OnInit } from '@angular/core';

import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { ConstantsService } from '../services/constants/constants.service';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-budget-allocation',
  templateUrl: './budget-allocation.component.html',
  styleUrls: ['./budget-allocation.component.scss'],
})
export class BudgetAllocationComponent implements OnInit {
  budgetFinYears: any[] = [];
  subHeads: any[] = [];
  cgUnits: any[] = [];
  budgetTypes: any[] = [];
  allocationTypes: any[] = [];
  majorHead: any;
  minorHead: any;
  fundAvailable: any;
  previousAllocation: any;

  // cgUnits = [
  //   { unit: 456, descr: 'CGIO Okha' },
  //   { unit: 457, descr: 'ICGS Delhi' },
  // ];

  constructor(
    private SpinnerService: NgxSpinnerService,
    private cons: ConstantsService,
    private apiService: ApiCallingServiceService
  ) {}

  ngOnInit(): void {
    this.getDataBudgetAllocation();
    // this.getCombo("MONTH", "");
    // this.getCombo("YEAR", "");
    // this.cgwwaUserDetails = JSON.parse(
    //   localStorage.getItem("cgwwaUserDetails") || ""
    // );
  }

  getDataBudgetAllocation() {
    this.SpinnerService.show();
    var comboJson = null;
    console.log(JSON.stringify(comboJson) + ' ======');
    this.apiService
      .getApi(this.cons.api.getDataBudgetAllocation)
      .subscribe((res) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = res;

        this.budgetFinYears = result['response'].budgetFinYearData;
        this.subHeads = result['response'].subHeadsData;
        this.cgUnits = result['response'].cgUnitData;
        this.budgetTypes = result['response'].budgetTypeData;
        this.allocationTypes = result['response'].allocationTypeData;

        console.log('data === ' + this.cgUnits[0].unit);
      });
  }

  subHeadSelected(subHead: any) {
    // this.majorHead = this.subHeads.filter(function (ele) {
    //   return (ele.id = a);
    // });
    console.log('majorHead ============== ' + subHead.majorHead);
    this.majorHead = subHead.majorHead;
    this.minorHead = subHead.minorHead;
  }

  getAvailableFund(cgUnit: any) {
    this.SpinnerService.show();
    var comboJson = null;
    console.log(JSON.stringify(comboJson) + ' ======');
    this.apiService
      .getApi(this.cons.api.getAvailableFund + '/' + cgUnit.cbUnit)
      .subscribe((res) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = res;

        this.fundAvailable = result['response'].fundAvailable;
        this.previousAllocation = result['response'].previousAllocation;
      });
  }
}

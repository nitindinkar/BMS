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
  selectedProjects: any;

  // budgetFinYears: any[] = [];
  // subHeads: any[] = [];
  // cgUnits: any[] = [];
  // budgetTypes: any[] = [];
  // allocationTypes: any[] = [];
  majorHead: any;
  minorHead: any;
  fundAvailable: any;
  previousAllocation: any;
  balanceFund: any;

  budgetFinYears = [
    { serialNo: 1, finYear: '2020-2021' },
    { serialNo: 2, finYear: '2021-2022' },
    { serialNo: 3, finYear: '2022-2023' },
  ];

  subHeads = [
    {
      id: 1,
      subheadDesc: 'Office Convinece',
      majorHead: '123',
      minorHead: '123',
    },
    {
      id: 2,
      subheadDesc: 'Room Convinece',
      majorHead: '123',
      minorHead: '123',
    },
    {
      id: 3,
      subheadDesc: 'Party Convinece',
      majorHead: '123',
      minorHead: '123',
    },
  ];

  cgUnits = [
    { unit: 456, descr: 'CGIO Okha' },
    { unit: 457, descr: 'ICGS Delhi' },
  ];

  budgetTypes = [
    { id: 1, descr: 'demo1' },
    { id: 2, descr: 'demo2' },
    { id: 3, descr: 'demo3' },
  ];

  allocationTypes = [
    { id: 1, allocDesc: 'demo1' },
    { id: 2, allocDesc: 'demo2' },
    { id: 3, allocDesc: 'demo3' },
  ];

  constructor(
    private SpinnerService: NgxSpinnerService,
    private cons: ConstantsService,
    private apiService: ApiCallingServiceService
  ) {}

  ngOnInit(): void {
    this.getDataBudgetAllocation();
    this.balanceFund = 0;
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
    // Only for demo
    this.fundAvailable = '10000';
    this.previousAllocation = '2000';

    // Only for demo
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

  addData() {}

  onSearchChange(searchValue: string): void {
    if (Number(searchValue) > this.fundAvailable) {
      console.log('Value cannot be greter than fund available');
    } else {
      this.balanceFund = Number(this.fundAvailable) - Number(searchValue);
    }
  }
}

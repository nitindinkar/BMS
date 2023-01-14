import { Component, OnInit } from '@angular/core';

import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { ConstantsService } from '../services/constants/constants.service';

import { NgxSpinnerService } from 'ngx-spinner';

import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-budget-allocation',
  templateUrl: './budget-allocation.component.html',
  styleUrls: ['./budget-allocation.component.scss'],
})
export class BudgetAllocationComponent implements OnInit {
  // budgetFinYears: any[] = [];
  // subHeads: any[] = [];
  // cgUnits: any[] = [];
  // budgetTypes: any[] = [];
  // allocationTypes: any[] = [];
  majorHead: any;
  minorHead: any;
  fundAvailable: any = 100003;
  previousAllocation: any = 2000;

  balanceFund: any;

  //for the new table entries
  newBudgetAllocationList: any[] = [];

  newBudgetAllocationArray: any[] = [];

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

  formdata = new FormGroup({
    finYearName: new FormControl(), //
    subHead: new FormControl(), //
    cbUnit: new FormControl(), //
    prevAllocation: new FormControl(this.previousAllocation),
    amount: new FormControl(),
    remarks: new FormControl(),
    budgetType: new FormControl(), //
    allocationType: new FormControl(), //
  });

  constructor(
    private SpinnerService: NgxSpinnerService,
    private cons: ConstantsService,
    private apiService: ApiCallingServiceService,
    private formBuilder: FormBuilder
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

  addData(data: any) {
    // console.log(
    //   'Values come form table === ' +
    //     this.newBudgetAllocationForm.controls['cbUnit'].value.descr
    // );
    // console.log(
    //   'Values come form table === ' +
    //     this.newBudgetAllocationForm.controls['amount'].value
    // );
    this.newBudgetAllocationList.push(data);
    this.showList();
  }
  showList() {
    debugger;
    this.newBudgetAllocationArray = [];
    for (var i = 0; i < this.newBudgetAllocationList.length; i++) {
      var unitIndex = this.cgUnits.findIndex(
        (a: { unit: any }) => a.unit == this.newBudgetAllocationList[i].cbUnit
      );
      console.log('index == ' + unitIndex);
      this.newBudgetAllocationArray.push({
        financialYear: this.newBudgetAllocationList[i].finYearName.finYear,
        unitName: this.newBudgetAllocationList[i].cbUnit.descr,
        subHeadName: this.newBudgetAllocationList[i].subHead.subheadDesc,
        budgetTypeName: this.newBudgetAllocationList[i].budgetType.descr,
        allocationTypeName:
          this.newBudgetAllocationList[i].allocationType.allocDesc,
        prevAllocationName: this.newBudgetAllocationList[i].prevAllocation,
        amount: this.newBudgetAllocationList[i].amount,
        remarks: this.newBudgetAllocationList[i].remarks,
      });
    }
  }

  onSearchChange(searchValue: string): void {
    if (Number(searchValue) > this.fundAvailable) {
      console.log('Value cannot be greter than fund available');
    } else {
      this.balanceFund = Number(this.fundAvailable) - Number(searchValue);
    }
  }
}

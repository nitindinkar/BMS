import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { ConstantsService } from '../services/constants/constants.service';
import { CommonService } from '../services/common/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

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
  budgetFinYears: any[] = [];
  subHeads: any[] = [];
  cgUnits: any[] = [];
  budgetTypes: any[] = [];
  allocationTypes: any[] = [];
  allocationAuthorityUnits: any[] = [];
  authorityTypes: any[] = [];
  majorHead: any;
  minorHead: any;
  fundAvailable: any = 0;
  previousAllocation: any = 0;

  uploadFileResponse: any;

  p: number = 1;
  length: number = 0;

  balanceFund: any;

  //for the new table entries
  newBudgetAllocationList: any[] = [];
  saveBudgetDataList: any[] = [];
  newBudgetDataSaveList: any[] = [];

  newBudgetAllocationArray: any[] = [];

  submitJson: any;

  // budgetFinYears = [
  //   { serialNo: 1, finYear: '2020-2021' },
  //   { serialNo: 2, finYear: '2021-2022' },
  //   { serialNo: 3, finYear: '2022-2023' },
  // ];

  // subHeads = [
  //   {
  //     id: 1,
  //     subheadDesc: 'Office Convinece',
  //     majorHead: '123',
  //     minorHead: '123',
  //   },
  //   {
  //     id: 2,
  //     subheadDesc: 'Room Convinece',
  //     majorHead: '123',
  //     minorHead: '123',
  //   },
  //   {
  //     id: 3,
  //     subheadDesc: 'Party Convinece',
  //     majorHead: '123',
  //     minorHead: '123',
  //   },
  // ];

  // cgUnits = [
  //   { unit: 456, descr: 'CGIO Okha' },
  //   { unit: 457, descr: 'ICGS Delhi' },
  // ];

  // budgetTypes = [
  //   { id: 1, descr: 'demo1' },
  //   { id: 2, descr: 'demo2' },
  //   { id: 3, descr: 'demo3' },
  // ];

  // allocationTypes = [
  //   { id: 1, allocDesc: 'demo1' },
  //   { id: 2, allocDesc: 'demo2' },
  //   { id: 3, allocDesc: 'demo3' },
  // ];

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

  saveBudgetData = new FormGroup({
    allocationAuthorityUnits: new FormControl(),
    authorityTypes: new FormControl(),
    authorityName: new FormControl(),
    budgetDate: new FormControl(),
  });

  constructor(
    private SpinnerService: NgxSpinnerService,
    private cons: ConstantsService,
    private apiService: ApiCallingServiceService,
    private formBuilder: FormBuilder,
    private common: CommonService
  ) {}

  ngOnInit(): void {
    this.getDataBudgetAllocation();
    this.balanceFund = 0;
    // this.getCombo("MONTH", "");
    // this.getCombo("YEAR", "");
    // this.cgwwaUserDetails = JSON.parse(
    //   localStorage.getItem("cgwwaUserDetails") || ""
    // );
    $.getScript('assets/main.js');
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

        this.allocationAuthorityUnits =
          result['response'].allocationAuthorityUnits;
        this.authorityTypes = result['response'].authorityTypes;

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
    this.newBudgetAllocationArray = [];
    for (var i = 0; i < this.newBudgetAllocationList.length; i++) {
      this.length = this.newBudgetAllocationList.length;

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

  file: any;

  onChangeFile(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('pet1', this.file);

    this.SpinnerService.show();

    this.apiService.postApi(this.cons.api.fileUpload, formData).subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;

        if (result['message'] == 'success') {
          // this.newSubcList = [];
          this.uploadFileResponse = '';
          // this.newSubcArr = [];
          this.uploadFileResponse = result['response'];
          console.log(
            'upload file data ======= ' +
              JSON.stringify(this.uploadFileResponse) +
              ' =submitJson'
          );
          this.common.successAlert(
            'Success',
            result['response']['msg'],
            'success'
          );
        } else {
          this.common.faliureAlert('Please try later', result['message'], '');
        }
      },
      error: (e) => {
        this.SpinnerService.hide();
        console.error(e);
        this.common.faliureAlert('Error', e['error']['message'], 'error');
      },
      complete: () => console.info('complete'),
    });
  }

  saveBudgetDataFn(data: any) {
    // saveBudgetDataList: any[] = [];
    // newBudgetDataSaveList: any[] = [];

    this.saveBudgetDataList.push(data);

    var newBudgetAllocationListSubArray = [];

    for (var i = 0; i < this.newBudgetAllocationList.length; i++) {
      newBudgetAllocationListSubArray.push({
        budgetFinanciaYearId:
          this.newBudgetAllocationList[i].finYearName.serialNo,
        budgetBatchNo: '001',
        toUnitId: this.newBudgetAllocationList[i].cbUnit.cbUnit,
        subHeadId: this.newBudgetAllocationList[i].subHead.subheadId,
        amount: this.newBudgetAllocationList[i].amount,
        remark: this.newBudgetAllocationList[i].remarks,
        budgetTypeId: this.newBudgetAllocationList[i].budgetType.id,
        allocationTypeId:
          this.newBudgetAllocationList[i].allocationType.allocId,
      });
      this.submitJson = {
        listData: newBudgetAllocationListSubArray,
        docTypeId: this.uploadFileResponse.uploadDocId,
        authorityUnit: data.authorityName,
        authorityRemark: 'kya hai ye',
        // date: '1245857463636',
        date: data.budgetDate,
        authroityTypeId: data.authorityTypes.authorityTypeId,
        fromUnitId: data.allocationAuthorityUnits.cbUnit,
      };

      // var submitJson = {
      //   authorityUnit: 'Diwakar',
      // };
    }

    // newBudgetDataSaveList

    this.confirmModel(this.submitJson);
  }

  confirmModel(data: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, submit it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.finallySubmit(this.submitJson);
      }
    });
  }

  finallySubmit(data: any) {
    this.SpinnerService.show();
    // var newSubmitJson = this.submitJson;
    var newSubmitJson = data;
    console.log(JSON.stringify(newSubmitJson) + ' =submitJson for save budget');

    this.apiService
      .postApi(this.cons.api.saveBudgetAllocation, newSubmitJson)
      .subscribe({
        next: (v: object) => {
          this.SpinnerService.hide();
          let result: { [key: string]: any } = v;

          // console.log(JSON.stringify(result) + " =submitJson");

          if (result['message'] == 'success') {
            // this.newSubcList = [];
            // this.newSubcArr = [];
            this.common.successAlert(
              'Success',
              result['response']['msg'],
              'success'
            );
          } else {
            this.common.faliureAlert('Please try later', result['message'], '');
          }
        },
        error: (e) => {
          this.SpinnerService.hide();
          console.error(e);
          this.common.faliureAlert('Error', e['error']['message'], 'error');
        },
        complete: () => console.info('complete'),
      });

    // this.common.successAlert('Success', 'Finally submitted', 'success');
  }
}

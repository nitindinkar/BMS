// import { Component } from '@angular/core';
import { Component } from '@angular/core'; //OnInit 
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { ConstantsService } from '../services/constants/constants.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Injectable, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService } from '../services/common/common.service';
import Swal from 'sweetalert2';


@Injectable()
@Component({
  selector: 'app-budget-update',
  templateUrl: './budget-update.component.html',
  styleUrls: ['./budget-update.component.scss']
})
export class BudgetUpdateComponent implements OnInit {
  selectedProjects: any;

  majorHead: any;
  minorHead: any;
  fundAvailable: any;
  previousAllocation: any = 0;
  balanceFund: any;
  uploadFileResponse: any;

  p: number = 1;
  length: number = 0;
  


  budgetFinYears = [
    { serialNo: 1, finYear: '2020-2021' },
    { serialNo: 2, finYear: '2021-2022' },
    { serialNo: 3, finYear: '2022-2023' },
    { serialNo: 3, finYear: '2032-2033' },
  ];

  subHeads = [
    {
      id: 1,
      subheadDesc: 'Office Expenses',
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
    { unit: 458, descr: 'ICGS Vaibhav' },
    // { unit: 456, descr: 'RHQ(W)' },
    // { unit: 457, descr: 'RHQ(E)' },
    // { unit: 458, descr: 'RHQ(S)' },
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

    // { id: 1, allocDesc: 'Up' },
    // { id: 2, allocDesc: 'initial' },
    // { id: 3, allocDesc: 'initial' },
  ];
  saveBudgetDataList: any[] = [];
  newBudgetAllocationList: any[] = [];
  newBudgetAllocationArray: any[] = [];

  submitJson: any;


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
     private common: CommonService,
    


  ) {}
  ngOnInit(): void {
    // this.getDataBudgetAllocation();
    this.balanceFund = 0;
  }

  getDataBudgetAllocation() {

    this.SpinnerService.show();
    var comboJson = null;
    console.log(JSON.stringify(comboJson) + ' ======');
    this.apiService
      .getApi(this.cons.api.getDataBudgetAllocation)// need to ask
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
  addData(data: any) {
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

////need to ask for today 
selectedFinYear:any = '';
  inputFinYear(finYear: any) {
    this.selectedFinYear = finYear.finYear;
    
  }

  getBudgetByUnitAndFinYear(cbUnit:any) {
console.log("Selected fin year from getBudgetByUnitAndFinYear ==  " + this.selectedFinYear);

console.log("Selected unit from getBudgetByUnitAndFinYear ==  " + cbUnit.descr);
  }
////need to ask for today


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
      subHeadId: this.newBudgetAllocationList[i].subHead.id,
      amount: this.newBudgetAllocationList[i].amount,
      remark: this.newBudgetAllocationList[i].remarks,
      budgetTypeId: this.newBudgetAllocationList[i].budgetType.id,
      allocationTypeId: this.newBudgetAllocationList[i].allocationType.id,
    });

    this.submitJson = {
      listData: newBudgetAllocationListSubArray,
      docTypeId: this.uploadFileResponse.uploadDocId,
      authorityUnit: data.authorityName,
      authorityRemark: 'kya hai ye',
      date: '1245857463636',
      // date: data.budgetDate,
      authroityTypeId: data.allocationAuthorityUnits.allocationAuthorityUnit,
    };
  }

  // newBudgetDataSaveList

  this.confirmModel(this.submitJson);
}

confirmModel(submitJsonArgs: any) {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      this.finallySubmit(submitJsonArgs);
    }
  });
}

finallySubmit(submitJsonArgs: any) {
  console.log(
    JSON.stringify(submitJsonArgs) + ' =submitJson for save budget'
  );

  this.SpinnerService.show();
  this.apiService
    .postApi(this.cons.api.saveBudgetAllocation, submitJsonArgs)
    .subscribe({
      next: (v: object) => {
        this.SpinnerService.hide();
        let result: { [key: string]: any } = v;

        // console.log(JSON.stringify(result) + " =submitJson");

        debugger;
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



      


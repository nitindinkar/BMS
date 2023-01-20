import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  constructor() {}

  // serviceUrl = 'https://icg.net.in/cgwwa/'; //prod
  // serviceUrl = 'http://488e-203-153-42-234.ngrok.io/'; //dev
  serviceUrl = 'http://192.168.1.131:1111/'; //dev

  api = {
    getDataBudgetAllocation:
      this.serviceUrl + 'BudgetAllocation/getDataBudgetAllocation',
    getAvailableFund: this.serviceUrl + 'BudgetAllocation/getAvailableFund',
    fileUpload: this.serviceUrl + 'fileUpload/uploadFile',
    saveBudgetAllocation:
      this.serviceUrl + 'BudgetAllocation/saveBudgetAllocation',
  };
}

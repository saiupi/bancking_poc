import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  submitted = false;
  toatlAmount = 0;
  getTotalData;
  getTotalCreditedData;
  creditedData = [];
  debitedData = [];
  filteredData;
  filteredDebitedData;
  date = new Date();

  // form declaration with validations
  transactionForm = this.formBuilder.group({
    amount: ['', [Validators.required, Validators.min(1), Validators.max(1000), Validators.pattern("^[0-9]*$")]],
    reason: ['', [Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]]
  });

  constructor(private formBuilder: FormBuilder, private service: ServicesService) { }

  ngOnInit() {
    this.getData();
  }

  // convenience getter for easy access to form fields
  get f() { return this.transactionForm.controls; }

  getData() {
    this.service.getData().subscribe(res => {
      console.log(res, "response");
      this.getTotalData = res;
      for (let key of this.getTotalData) {

        this.toatlAmount = key.toatlAmount;

        //spending array
        this.filteredData = this.getTotalData.filter(val => {
          return val.debitOrCredit === true;
        })
        //received array
        this.filteredDebitedData = this.getTotalData.filter(val => {
          return val.debitOrCredit === false;
        })

      }

    })
  };



  //credit transactions
  postCreditTransaction() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.transactionForm.invalid) {
      return;
    }
    let obj = {
      amount: JSON.parse(this.transactionForm.controls.amount.value),
      reason: this.transactionForm.controls.reason.value,
      toatlAmount: this.toatlAmount + JSON.parse(this.transactionForm.controls.amount.value),
      debitOrCredit: true,
      date: this.date
    }
    this.service.postCreditTransaction(obj).subscribe(res => {
      console.log(res, "posting");
      this.getData();
      this.transactionForm.reset();
      this.submitted = false;

    });

  }

  //Debit transactions
  postDebitTransaction() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.transactionForm.invalid) {
      return;
    }

    let obj = {
      amount: JSON.parse(this.transactionForm.controls.amount.value),
      reason: this.transactionForm.controls.reason.value,
      toatlAmount: this.toatlAmount - JSON.parse(this.transactionForm.controls.amount.value),
      debitOrCredit: false,
      date: this.date
    }
    this.service.postDebitTransaction(obj).subscribe(res => {
      console.log(res, "posting");
      this.getData();
      this.transactionForm.reset();
      this.submitted = false;

    });

  }

}
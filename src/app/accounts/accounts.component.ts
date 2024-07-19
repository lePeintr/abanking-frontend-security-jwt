import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf ,CommonModule ,JsonPipe} from '@angular/common';
import { AccountsService } from '../services/accounts.service';
import { catchError, Observable, throwError } from 'rxjs';
import { AccountDetails } from '../model/account.model';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,NgFor, NgIf ,CommonModule ,JsonPipe],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit {
 
  accountFormGroup! : FormGroup;
  currentPage : number = 0;
  pageSize:number = 5;
  accountObservable! :Observable<AccountDetails>
  operationFormGroup! :FormGroup;
  errorMessage! :string;

  constructor(private fb: FormBuilder,private accountService:AccountsService){}
  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountId: this.fb.control(null)
    })
    this.operationFormGroup = this.fb.group({
      operationType : this.fb.control(null),
      amount:this.fb.control(0),
      description:this.fb.control(null),
      accountDestination:this.fb.control(null)
    })
  }

  handleSearchAccount(){
    let accountId : string = this.accountFormGroup.value.accountId;
    this.accountObservable= this.accountService.getAccount(accountId,this.currentPage,this.pageSize).pipe(
      catchError(err=>{
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }  

  gotoPage(page : number) {
    this.currentPage=page;
    this.handleSearchAccount();
  }

  handleAcountOperation(){
  let accountId : string = this.accountFormGroup.value.accountId;
  console.log(accountId)
  let operationType= this.operationFormGroup.value.operationType;
  let amount : number = this.operationFormGroup.value.amount;
  let description : string = this.operationFormGroup.value.description;
  let accountDestination = this.operationFormGroup.value.accountDestination;
  console.log("operation type: "+operationType);
  if(operationType=="DEBIT"){
     this.accountService.debit(accountId,amount,description).subscribe({
      next:(data)=>{
        alert("Success Debit");
        this.handleSearchAccount();
      },
      error:(err)=>{
        console.log(err);
        alert("erreur");
      }
    }) 
      console.log(operationType)
  }else if(operationType=="CREDIT"){
     this.accountService.credit(accountId,amount,description).subscribe({
      next:(data)=>{
        alert("Success Credit");
        this.handleSearchAccount();
      },
      error:(err)=>{
        console.log(err);
        alert("erreur");
      }
    }) 
      console.log(operationType)
  }else if(operationType=="TRANSFER"){
     console.log(operationType)
    this.accountService.tranfer(accountId,accountDestination,amount,description).subscribe({
      next:(data)=>{
        console.log("source: "+accountId)
        console.log("destinaation: "+accountDestination)
        alert("Success Transfert");
        this.handleSearchAccount();
      },
      error:(err)=>{
        console.log(err);
        alert("erreur");
      }
    }) 
  }
  this.operationFormGroup.reset();
  }
}
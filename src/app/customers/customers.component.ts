import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf ,CommonModule ,JsonPipe} from '@angular/common';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../model/customer.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { state } from '@angular/animations';



@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [NgFor,NgIf,CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{

  customers! : Customer[];
  errorMessage! : string;
  searchCustomerForm!: FormGroup;
  constructor(private customerService: CustomerService,private fb:FormBuilder,private router: Router){
  }


  ngOnInit(): void {
  this.getCustomers();
  this.searchCustomerForm=this.fb.group({
    keyword: this.fb.control(null)
  })
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe({
      next:(data)=>{
        this.customers=data;
      },
      error:(err)=>{
        this.errorMessage=err.message;
      }
    })
  }

  handleSearchCustomer(){
    let keyword = this.searchCustomerForm.value.keyword;
    this.customerService.getSearchCustomers(keyword).subscribe({
      next:(data)=>{
        this.customers=data;
      },
      error:(err)=>{
        this.errorMessage=err.message;
      }
    });
  }

  handleDeleteCustomer(c: Customer){
    let conf = confirm("Are you sure?");
    if( conf==false) return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next:(data)=>{
        let index = this.customers.indexOf(c);
        this.customers.splice(index,1);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  handleCustomerAccounts(c:Customer){
    this.router.navigateByUrl("/customerAccounts/"+c.id,{state:c});
     //le state permet d'envoyer l'objet customer par la route à un autre component
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule,FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent implements OnInit {

  newCustomerFormGroup! : FormGroup;
  constructor(private fb: FormBuilder,public customerService: CustomerService){}

  ngOnInit(): void {
   this.newCustomerFormGroup = this.fb.group(
   { name:this.fb.control(null,[Validators.required,Validators.minLength(4)]),
     email:this.fb.control(null,[Validators.required,Validators.email])
   })
  }

  handleSaveCustomer(){
/*  let name = this.newCustomerFormGroup.value.name;
    let email = this.newCustomerFormGroup.value.email; */
   let customer = this.newCustomerFormGroup.value //on recupère une fois toutes les données du formulaire   
   
  this.customerService.saveCustomer(customer).subscribe({
    next:(data)=>{
      alert("Customer saved successfully")
      this.newCustomerFormGroup.reset();
    },
    error:(err)=>{
      console.log(err);
    }
    });

  }

}


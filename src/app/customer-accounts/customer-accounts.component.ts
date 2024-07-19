import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../model/customer.model';
import { CommonModule ,JsonPipe} from '@angular/common';

@Component({
  selector: 'app-customer-accounts',
  standalone: true,
  imports: [CommonModule ,JsonPipe],
  templateUrl: './customer-accounts.component.html',
  styleUrl: './customer-accounts.component.css'
})
export class CustomerAccountsComponent implements OnInit  {

  customerId! :string ;
  customer !: Customer;

  constructor(private route: ActivatedRoute, private router :Router){
  //Dans ce component ici on recupère le parametre state qui contient l'objet customer qu'on a envoyé par la route avec l'id 
   this.customer=this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    //on recupère l'id de la route de l'url pour faire les traitement
   this.customerId=this.route.snapshot.params['id'];
  }


}

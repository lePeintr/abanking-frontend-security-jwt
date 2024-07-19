import { Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { AccountsComponent } from './accounts/accounts.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { CustomerAccountsComponent } from './customer-accounts/customer-accounts.component';

export const routes: Routes = [
    {path:"customers",component:CustomersComponent},
    {path:"accounts",component:AccountsComponent},
    {path:"newCustomer", component:NewCustomerComponent},
    {path:"customerAccounts/:id", component:CustomerAccountsComponent}
];

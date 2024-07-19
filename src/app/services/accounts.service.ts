import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';
import { environnemnt } from '../../environnements/environnement';
import { AccountDetails } from '../model/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  constructor(private http: HttpClient) { }

  public getAccount(accountId: string,page : number, size : number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>(environnemnt.backendHost+"/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);
  }
 
  public debit(accountId: string,amount : number, description : string){
    let data={accountId: accountId,amount: amount,description: description};
    return this.http.post(environnemnt.backendHost+"/accounts/debit",data);
    }

  public credit(accountId: string,amount : number, description : string){
    let data={accountId: accountId,amount: amount,description: description};
    return this.http.post(environnemnt.backendHost+"/accounts/credit",data);
    }

    public tranfer(accountSource : string,accountDestination :  string,amount : number, description : string){
      let data={accountSource,accountDestination,amount,description};
      console.log(data)
      return this.http.post(environnemnt.backendHost+"/accounts/transfert",data);
      } 
}

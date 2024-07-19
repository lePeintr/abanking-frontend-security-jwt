import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';
import { environnemnt } from '../../environnements/environnement';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  backendHost:string="http://localhost:8085/customers";
  constructor(private http: HttpClient) { }

  public getCustomers():Observable<Customer[]>{
    let rnd=Math.random();
    if(rnd<0.1) return throwError(()=>new Error("Internet connexion error"));
   else  return this.http.get<Array<Customer>>(environnemnt.backendHost+"/customers"
   );
  }

  public getSearchCustomers(keyword: string){
    return this.http.get<Array<Customer>>(environnemnt.backendHost+"/customers/search?keyword="+keyword);
    }

    public saveCustomer(customer: Customer):Observable<Customer>{
      return this.http.post<Customer>(environnemnt.backendHost+"/customers",customer);
    }

    public deleteCustomer(id: number){
      return this.http.delete(environnemnt.backendHost+"/customers/"+id);
    }
    getErrorMessage(fieldName:string,error:any):string{
      if(error['required']){
        return fieldName + " is Required";
      }else if(error['minlength']){ 
        return fieldName+" should have at least "+error['minlength']['requiredLength']+" Characters";
      }else if(error['email']){ 
        return fieldName+" should contains @ "+error['email'];
      }else return "";
      
    }
    
}

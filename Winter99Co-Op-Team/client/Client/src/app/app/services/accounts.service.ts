import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Account} from "../../models/Account";

@Injectable()
export class AccountsService {

  constructor(private http:HttpClient) { }

  public async getAccount(): Promise<Account[]> {
    return this.http.post<Account[]>("https://localhost:5001/api/account/getaccount", {AccountId: '4000000028'}).toPromise();
  }
}

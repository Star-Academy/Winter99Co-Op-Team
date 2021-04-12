import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Account} from '../../models/Account';
import {Transaction} from '../../models/Transaction';

@Injectable()
export class AccountsService {

  constructor(private http: HttpClient) {
  }

  public async getAccount(id: string): Promise<Account> {
    return this.http.post<Account>('https://localhost:5001/api/account/getaccount', {AccountId: id}).toPromise();
  }

  public async getTransactionsOfAnAccount(id: string): Promise<Transaction[]> {
    return this.http.post<Transaction[]>('https://localhost:5001/api/transaction/getTransactionsOfAnAccount', {AccountId: id}).toPromise();
  }
}

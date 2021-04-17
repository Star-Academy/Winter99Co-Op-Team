import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Account} from '../../models/Account';
import {Transaction} from '../../models/Transaction';

@Injectable()
export class AccountsService {

  constructor(private http: HttpClient) {
  }

  public async getAccount(id: string): Promise<Account> {
    const response = await this.http.post<Account>('https://localhost:5001/account/getaccount', {accountId: id}).toPromise();
    return response;
  }

  public async getTransactionsOfAnAccount(id: string): Promise<Transaction[]> {
    const response = await this.http.post<Transaction[]>('https://localhost:5001/transaction/getTransactionsOfAccount', {accountId: id}).toPromise();
    return response;
  }
}

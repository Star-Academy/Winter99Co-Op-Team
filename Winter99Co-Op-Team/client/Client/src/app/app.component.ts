import {Component, OnInit} from '@angular/core';
import * as Ogma from '../assets/ogma.min.js';
import {HttpClient} from '@angular/common/http';
import {AccountsService} from './app/services/accounts.service';
import {Account} from './models/Account';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Client';

  private ogma: Ogma;
  // private nodes = Node[];
  private nodes = [];
  private links = [];
  private nodesMaxCount = 10;
  private nodesCount: number;
  private linksCount: number;
  private width: number;
  private height: number;


  private account1: Account = {
    AccountType: 'سپرده',
    BranchAdress: 'تهران-خيابان شهيد مدنی-نبش خيابان اميرشرفی',
    BranchName: 'امیر شرفی',
    BranchTelephone: '212154454',
    CardID: '6037699000000020',
    OwnerFamilyName: 'سلامی',
    OwnerID: '122121',
    OwnerName: 'سلام',
    Sheba: 'IR033880987114000000028',
    AccountID: '4000000028'
  };
  private account2: Account = {
    AccountType: 'سپرده',
    BranchAdress: 'تهران-خيابان شهيد مدنی-نبش خيابان امیر غربی',
    BranchName: 'امیر غربی',
    BranchTelephone: '9999999',
    CardID: '8888888',
    OwnerFamilyName: 'خدافظی',
    OwnerID: '111111',
    OwnerName: 'سلام',
    Sheba: 'IR03388098788888888',
    AccountID: '78787878787'
  };


  constructor(private service: AccountsService) {
  }

  ngOnInit(): void {
    // const account = await this.service.getAccount();
    // console.log(account);
    this.initOgma();
  }

  private initOgma(): void {

    this.ogma = new Ogma({
      container: 'graph-container',
    });
    this.width = 1080;
    this.height = 720;
    // graph-container width and height

    this.nodesCount = Math.floor(Math.random() * this.nodesMaxCount) + 1;
    this.linksCount = Math.floor(Math.random() * this.nodesMaxCount);
    // random nodes count and links count

    this.ogma.addNodes(this.nodes);
    // adding created nodes to ogma

    this.ogma.styles.addEdgeRule({
      text: {
        maxLineLength: 140, // truncate
        size: 12,
        color: 'black',
        minVisibleSize: 2,
        content: e => 'Edge ' + e.getId()
      }
    });

    this.links.push(
      {id: 'e' + 2, source: 'n' + 3, target: 'n' + 1, data: {name: 'parent'}}
    ); // data is a custom dictionary for containing data
    this.ogma.addEdges(this.links);
    // adding created links to ogma
  }

  private createNode(id: string): void {
    for (const a of this.nodes) {
      if (a.id === id) {
        return;
      }
    }
    const accountResult = this.service.getAccount(id);
    this.nodes.push({
      id: accountResult.then(r => r.AccountID),
      data: {name: accountResult.then(r => r.AccountID)},
      attributes: {x: 50, y: 50, radius: 20}
    });
  }

  private async createLink(id: string): Promise<void> {
    const transactionsResult = this.service.getTransactionsOfAnAccount(id);
    const size = await transactionsResult.then(r => r.length);
    for (let i = 0; i < size; i++) {
      const transaction = transactionsResult.then(r => r.pop());
      this.createNode(await transaction.then(r => r.destiantionAccount));
      this.links.push({
        id: transaction.then(r => r.transactionID),
        source: id,
        target: transaction.then(r => r.destiantionAccount),
        data: {name: 'parent', color: 'red'}
      });
    }
  }
}

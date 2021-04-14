import {Component, OnInit} from '@angular/core';
import * as Ogma from '../assets/ogma.min.js';
import {AccountsService} from './app/services/accounts.service';
import {Account} from './models/Account';
import {Transaction} from "./models/Transaction";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Client';

  private account: Account;

  private ogma: Ogma;
  private nodes = [];
  private links = [];
  private width: number;
  private height: number;

  public account1: Account = {
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
    this.setWidthAndHeight();
    this.addEdgeRules();
    this.addClickListener();
  }

  public addNode(id: string) {
    this.createNode(id);
    this.createLink(id);
  }

  private setWidthAndHeight() {
    this.width = 1080;
    this.height = 720;
  }

  private addEdgeRules(){
    this.ogma.styles.addEdgeRule({
      text: {
        maxLineLength: 140, // truncate
        size: 12,
        color: 'black',
        minVisibleSize: 2,
        content: e => 'Edge ' + e.getId()
      }
    });
  }

  private addClickListener(){
    let currentNode;

    this.ogma.events.onClick(function(evt) {

      if (evt.target === null) {
        console.log('clicked on background at coordinates', evt.x, evt.y);
      } else if (evt.target.isNode && evt.button === 'left') { // you have clicked on a node
        console.log('clicked on a node with id', evt.target.getId());

        var position = this.ogma.view.graphToScreenCoordinates({ x: evt.x, y: evt.y });

        // showContextMenu(evt.target, position.x, position.y);

        const app = document.getElementById("account-info");
        const p = document.createElement("p");
        p.textContent = evt.target.getId();
        app?.appendChild(p);

        const account = this.service.getAccount(evt.target.getId())

        const p2 = document.createElement("p");
        p2.textContent = account.then(r => r.Sheba);
        app?.appendChild(p2);

        const p3 = document.createElement("p");
        p3.textContent = account.then(r => r.OwnerName);
        app?.appendChild(p);
      } else if (evt.button === 'right' && evt.target && evt.target.isNode) {
        console.log("right clicked");
        let selected = this.ogma.getSelectedNodes();

        let group = false;

        // show different menu tems for groups and single nodes
        if (selected.includes(evt.target)) {
          currentNode = selected;
          group = true;
        } else {
          currentNode = evt.target;
        }

        // get screen coordinates to position the context menu
        let position = this.ogma.view.graphToScreenCoordinates(evt.target.getPosition());

        // The user-defined showMenu function displays the menu
        this.showMenu(position.x, position.y, group);
      }
      else { // it's an edge
        let edge = evt.target;
        console.log('clicked on an edge between ', edge.getSource().getId(), ' and', edge.getTarget().getId());
      }
    }.bind(this));
  }

  private showMenu(x, y, group: boolean) {
    var body = document.getElementById('body');
    var d = document.createElement('p');
    d.textContent = "salam";
    d.style.position = "absolute";
    d.style.left = x+'px';
    d.style.top = y+'px';
    body?.appendChild(d);
  }

  private createNode(id: string) {
    for (const a of this.nodes) {
      if (a.id === id) {
        return;
      }
    }

    const accountResult = this.service.getAccount(id);

    if (accountResult === null) {
      return;
    }
    // console.log(id);

    let node = this.getNode(id);

    this.nodes.push(node);

    this.ogma.addNodes(this.nodes);
  }

  private getNode(id: string): any{
    const randomX = Math.random() * this.width - this.width / 2;
    const randomY = Math.random() * this.height - this.height / 2;

    let node = {
      id: id,
      data: {name: id},
      attributes: {x: randomX, y: randomY, radius: 20}
    };
    return node;
  }

  private async createLink(id: string){

    const transactionsResult = this.service.getTransactionsOfAnAccount(id);

    if (transactionsResult == null) {
      return;
    }

    const size = await transactionsResult.then(r => r.length);

    for (let i = 0; i < size; i++) {

      const transaction = transactionsResult.then(r => r.pop());

      for (let i of this.links) {
        if (i.id === transaction.then(r => r.transactionID)){
          return
        }
      }

      this.createNode(await transaction.then(r => r.destiantionAccount));

      let link = this.getLink(id, transaction);

      this.links.push(link);

      this.ogma.addEdges(link);
    }
  }

  private getLink(id: string, transaction: Promise<Transaction>):any{
    let link = {
      id: transaction.then(r => r.transactionID),
      source: id,
      target: transaction.then(r => r.destiantionAccount),
      data: {name: 'parent', color: 'red'}
    }
    return link;
  }

}

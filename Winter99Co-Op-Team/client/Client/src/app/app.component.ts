import {Component, OnInit} from '@angular/core';
import * as Ogma from '../assets/ogma.min.js';
import {AccountsService} from './app/services/accounts.service';
import {Account} from './models/Account';
import {Transaction} from './models/Transaction';

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
  private counter: number;
  private item1: HTMLElement;
  private item2: HTMLElement;
  private item3: HTMLElement;
  private counter1: number = 0;


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
    this.item1 = document.createElement('div');
    this.item2 = document.createElement('div');
    this.item3 = document.createElement('div');

  }

  public addNode(id: string) {
    this.createNode(id);
    // this.createLink(id);
  }

  private setWidthAndHeight() {
    this.width = 1080;
    this.height = 720;
  }

  private addEdgeRules() {
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

  private addClickListener() {
    let currentNode;

    this.ogma.events.onClick(function (evt) {

      if (evt.target === null) {
        console.log('clicked on background at coordinates', evt.x, evt.y);
      } else if (evt.target.isNode && evt.button === 'left') { // you have clicked on a node
        console.log('clicked on a node with id', evt.target.getId());

        const position = this.ogma.view.graphToScreenCoordinates({x: evt.x, y: evt.y});

        // showContextMenu(evt.target, position.x, position.y);

        const app = document.getElementById('account-info');
        const p = document.createElement('p');
        p.textContent = evt.target.getId();
        app?.appendChild(p);

        const account = this.service.getAccount(evt.target.getId());

        const p2 = document.createElement('p');
        p2.textContent = account.then(r => r.Sheba);
        app?.appendChild(p2);

        const p3 = document.createElement('p');
        p3.textContent = account.then(r => r.OwnerName);
        app?.appendChild(p);
      } else if (evt.button === 'right' && evt.target && evt.target.isNode) {
        console.log('right clicked');
        const selected = this.ogma.getSelectedNodes();

        let group = false;

        // show different menu tems for groups and single nodes
        if (selected.includes(evt.target)) {
          currentNode = selected;
          group = true;
        } else {
          currentNode = evt.target;
        }

        // get screen coordinates to position the context menu
        const position = this.ogma.view.graphToScreenCoordinates(evt.target.getPosition());

        // The user-defined showMenu function displays the menu
        this.showMenu(position.x, position.y, group);
      } else { // it's an edge
        const edge = evt.target;
        console.log('clicked on an edge between ', edge.getSource().getId(), ' and', edge.getTarget().getId());
      }
    }.bind(this));
  }

  public showMenu(x, y, group: boolean) {
    const body = document.getElementById('body');
    // const item1 = document.createElement('div');
    // const item2 = document.createElement('div');
    // const item3 = document.createElement('div');
    if (this.counter === 0) {
      this.item1.style.height = '30px';
      this.item1.style.width = '30px';
      this.item1.style.position = 'absolute';
      this.item1.style.margin = 'auto';
      this.item1.style.top = y - 50 + 'px';
      this.item1.style.left = x - 50 + 'px';
      this.item1.style.background = 'red';
      this.item1.style.borderRadius = '50%';
      this.item1.className = 'menu-items';

      this.item2.style.height = '30px';
      this.item2.style.width = '30px';
      this.item2.style.position = 'absolute';
      this.item2.style.margin = 'auto';
      this.item2.style.top = y - 65 + 'px';
      this.item2.style.left = x + 'px';
      this.item2.style.background = 'red';
      this.item2.style.borderRadius = '50%';
      this.item2.className = 'menu-items';

      this.item3.style.height = '30px';
      this.item3.style.width = '30px';
      this.item3.style.position = 'absolute';
      this.item3.style.margin = 'auto';
      this.item3.style.top = y - 50 + 'px';
      this.item3.style.left = x + 50 + 'px';
      this.item3.style.background = 'red';
      this.item3.style.borderRadius = '50%';
      this.item3.className = 'menu-items';
      console.log(this.counter);
      this.counter = 1;
    } else {
      this.item1.style.height = '0px';
      this.item1.style.width = '0px';
      this.item1.style.position = 'absolute';
      this.item1.style.margin = 'auto';
      this.item1.style.top = y - 50 + 'px';
      this.item1.style.left = x - 50 + 'px';
      this.item1.style.background = 'red';
      this.item1.style.borderRadius = '50%';
      this.item1.className = 'menu-items';

      this.item2.style.height = '0px';
      this.item2.style.width = '0px';
      this.item2.style.position = 'absolute';
      this.item2.style.margin = 'auto';
      this.item2.style.top = y - 65 + 'px';
      this.item2.style.left = x + 'px';
      this.item2.style.background = 'red';
      this.item2.style.borderRadius = '50%';
      this.item2.className = 'menu-items';

      this.item3.style.height = '0px';
      this.item3.style.width = '0px';
      this.item3.style.position = 'absolute';
      this.item3.style.margin = 'auto';
      this.item3.style.top = y - 50 + 'px';
      this.item3.style.left = x + 50 + 'px';
      this.item3.style.background = 'red';
      this.item3.style.borderRadius = '50%';
      this.item3.className = 'menu-items';
      console.log(this.counter);
      this.counter = 0;
    }

    body?.appendChild(this.item1);
    body?.appendChild(this.item2);
    body?.appendChild(this.item3);

    //
    // const item1 = document.createElement('div');
    // const item2 = document.createElement('div');
    // const item3 = document.createElement('div');
    //
    // const a1 = document.createElement('a');
    // const a2 = document.createElement('a');
    // const a3 = document.createElement('a');
    //
    // const icon1 = document.createElement('i');
    // const icon2 = document.createElement('i');
    // const icon3 = document.createElement('i');
    //
    // item1.className = 'item1';
    // item1.id = 'item1';
    // const center1 = document.createElement('div');
    // center1.style.textAlign = 'center';
    // icon1.className = 'fa fa-trash-o';
    // a1.appendChild(icon1);
    // center1.appendChild(a1);
    // item1.appendChild(center1);
    //
    // item2.className = 'item2';
    // item2.id = 'item2';
    // const center2 = document.createElement('div');
    // center2.style.textAlign = 'center';
    // icon2.className = 'fa fa-expand';
    // a2.appendChild(icon1);
    // center2.appendChild(a2);
    // item2.appendChild(center2);
    //
    // item3.className = 'item3';
    // item3.id = 'item3';
    // const center3 = document.createElement('div');
    // center3.style.textAlign = 'center';
    // icon3.className = 'fa fa-trash-o';
    // a3.appendChild(icon3);
    // center3.appendChild(a3);
    // item3.appendChild(center3);
    //
    // mainDiv.appendChild(item1);
    // mainDiv.appendChild(item2);
    // mainDiv.appendChild(item3);
    //
    //
    // // ToDo
    // // style of main-items > div
    //
    //
    // a1.style.color = 'white';
    // a2.style.color = 'white';
    // a3.style.color = 'white';
    //
    // item2.style.bottom = '80px';
    // item3.style.bottom = '160px';
    //
    // body?.appendChild(mainDiv);
    //
    // // <div class="menu-items">
    // // <div class="item1" id="item1">
    // // <div style="text-align: center;">
    // // <a href="#">
    // // <i class="fa fa-trash-o"></i>
    // //   </a>
    // //   </div>
    // //   </div>
    // //   <div class="item2" id="item2">
    // // <div style="text-align: center;">
    // // <a href="#">
    // // <i class="fa fa-expand"></i>
    // //   </a>
    // //   </div>
    // //   </div>
    // //   <div class="item3" id="item3">
    // // <div style="text-align: center;">
    // // <a href="#">
    // // <i class="fa fa-check"></i>
    // //   </a>
    // //   </div>
    // //   </div>
    // //   </div>
  }

  private createNode(id: string) {
    for (const a of this.nodes) {
      if (a.id === id) {
        return;
      }
    }

    const accountResult = this.service.getAccount(id) as unknown as Account;
    console.log(accountResult);
    console.log(this.counter1);
    this.counter1 += 1;

    if (Object.values(accountResult)[0] === null) {
      return;
    }


    const node = this.getNode(id);

    this.nodes.push(node);

    this.ogma.addNodes(this.nodes);
  }

  private getNode(id: string): any {
    const randomX = Math.random() * this.width - this.width / 2;
    const randomY = Math.random() * this.height - this.height / 2;

    const node = {
      id,
      data: {name: id},
      attributes: {x: randomX, y: randomY, radius: 20}
    };
    return node;
  }

  private async createLink(id: string) {

    const transactionsResult = this.service.getTransactionsOfAnAccount(id);

    if (transactionsResult == null) {
      return;
    }

    const size = await transactionsResult.then(r => r.length);

    for (let i = 0; i < size; i++) {

      const transaction = transactionsResult.then(r => r.pop());

      for (const i of this.links) {
        if (i.id === transaction.then(r => r.transactionID)) {
          return;
        }
      }

      this.createNode(await transaction.then(r => r.destiantionAccount));

      const link = this.getLink(id, transaction);

      this.links.push(link);

      this.ogma.addEdges(link);
    }
  }

  private getLink(id: string, transaction: Promise<Transaction>): any {
    const link = {
      id: transaction.then(r => r.transactionID),
      source: id,
      target: transaction.then(r => r.destiantionAccount),
      data: {name: 'parent', color: 'red'}
    };
    return link;
  }

}

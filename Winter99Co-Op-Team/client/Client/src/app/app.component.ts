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
  private counter: number = 0;
  private item1: HTMLDivElement;
  private item2: HTMLDivElement;
  private item3: HTMLDivElement;
  private script: HTMLScriptElement;


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
    this.script = document.createElement('script');
    this.script.src = 'https://kit.fontawesome.com/c7a9dbcce9.js';
    this.script.crossOrigin = 'anonymous';


    const a1 = document.createElement('a');
    const icon1 = document.createElement('i');

    const center1 = document.createElement('div');
    center1.style.textAlign = 'center';
    icon1.className = 'fa fa-trash-o';
    icon1.style.color = 'white';
    icon1.style.paddingTop = '15px';
    a1.appendChild(icon1);
    a1.href = '#';
    center1.appendChild(a1);
    this.item1.appendChild(center1);


    const a2 = document.createElement('a');
    const a3 = document.createElement('a');
    const icon2 = document.createElement('i');
    const icon3 = document.createElement('i');

    const center2 = document.createElement('div');
    center2.style.textAlign = 'center';
    icon2.className = 'fa fa-expand';
    a2.appendChild(icon2);
    center2.appendChild(a2);
    icon2.style.paddingTop = '15px';
    icon2.style.color = 'white';
    this.item2.appendChild(center2);


    const center3 = document.createElement('div');
    center3.style.textAlign = 'center';
    icon3.className = 'fa fa-comment';
    icon3.style.color = 'white';
    a3.appendChild(icon3);
    icon3.style.paddingTop = '15px';
    center3.appendChild(a3);
    this.item3.appendChild(center3);


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

    this.ogma.events.onClick(async function (evt) {

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

        const account = await this.service.getAccount(evt.target.getId());

        const p2 = document.createElement('p');
        p2.textContent = account.sheba;
        app?.appendChild(p2);

        const p3 = document.createElement('p');
        p3.textContent = account.ownerName;
        app?.appendChild(p3);
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

    body?.appendChild(this.script);

    if (this.counter === 0) {
      this.item1.style.height = '50px';
      this.item1.style.width = '50px';
      this.item1.style.position = 'absolute';
      this.item1.style.margin = 'auto';
      this.item1.style.top = y - 60 + 'px';
      this.item1.style.left = x - 60 + 'px';
      this.item1.style.background = '#1b1a1a';
      this.item1.style.borderRadius = '50%';
      this.item1.className = 'menu-items';

      this.item2.style.height = '50px';
      this.item2.style.width = '50px';
      this.item2.style.position = 'absolute';
      this.item2.style.margin = 'auto';
      this.item2.style.top = y - 75 + 'px';
      this.item2.style.left = x + 'px';
      this.item2.style.background = '#1b1a1a';
      this.item2.style.borderRadius = '50%';
      this.item2.className = 'menu-items';

      this.item3.style.height = '50px';
      this.item3.style.width = '50px';
      this.item3.style.position = 'absolute';
      this.item3.style.margin = 'auto';
      this.item3.style.top = y - 60 + 'px';
      this.item3.style.left = x + 60 + 'px';
      this.item3.style.background = '#1b1a1a';
      this.item3.style.borderRadius = '50%';
      this.item3.className = 'menu-items';
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
      this.counter = 0;
    }

    this.item1.onclick = async function (evt) {
      this.ogma.removeNodes(this.ogma.getSelectedNodes());
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
      this.counter = 0;
      console.log('ok');

    }.bind(this);

    body?.appendChild(this.item1);
    body?.appendChild(this.item2);
    body?.appendChild(this.item3);
  }

  private async createNode(id: string) {
    for (const a of this.nodes) {
      if (a.id === id) {
        return;
      }
    }

    const accountResult = await this.service.getAccount(id);
    console.log(accountResult.accountId);

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

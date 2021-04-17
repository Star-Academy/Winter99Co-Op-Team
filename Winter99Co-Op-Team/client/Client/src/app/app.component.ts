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
  private p: HTMLParagraphElement;
  private p2: HTMLParagraphElement;
  private p3: HTMLParagraphElement;
  private p4: HTMLParagraphElement;


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

    this.p = document.createElement('p');
    this.p2 = document.createElement('p');
    this.p3 = document.createElement('p');
    this.p4 = document.createElement('p');

  }

  public addNode(id: string) {
    this.createNode(id);
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
        content: e => e.getId()
      }
    });
  }

  private addClickListener() {
    let currentNode;

    this.ogma.events.onClick(async function (evt) {

      if (evt.target === null) {
      } else if (evt.target.isNode && evt.button === 'left') { // you have clicked on a node
        const position = this.ogma.view.graphToScreenCoordinates({x: evt.x, y: evt.y});
        const app = document.getElementById('account-info');
        // const p = document.createElement('p');
        this.p.textContent = evt.target.getId();
        app?.appendChild(this.p);

        const account = await this.service.getAccount(evt.target.getId());
        // const p2 = document.createElement('p');
        this.p2.textContent = account.sheba;
        app?.appendChild(this.p2);


        this.p3.textContent = account.ownerName + " " + account.ownerFamilyName;
        app?.appendChild(this.p3);

        this.p4 = document.createElement('p');
        this.p4.textContent = "-----------";
        // app?.appendChild(this.p4);

      } else if (evt.button === 'right' && evt.target && evt.target.isNode) {
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

    this.item1.onclick = async function () {
      const node = this.ogma.getSelectedNodes();
      this.ogma.removeNodes(node);
      let b = 0;
      // console.log(node.getId()[0]);
      for (const a of this.nodes) {
        if (a.id === node.getId()[0]) {
          console.log(this.nodes.length);
          console.log("b is:"+b);
          this.nodes.splice(b, 1);
          console.log(this.nodes.length);
          b += 1;
        }
      }
      // this.nodes.splice(b);
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
    }.bind(this);

    this.item2.onclick = async function () {
      const transactions = await this.service.getTransactionsOfAnAccount(this.ogma.getSelectedNodes().getId()[0]);
      await this.createLink(transactions);
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

    if (Object.values(accountResult)[0] === null) {
      return;
    }

    const node = this.getNode(id);
    this.ogma.addNode(node);

    console.log(this.nodes.length);
    const transactions = await this.service.getTransactionsOfAnAccount(id);
    for (const a of this.nodes) {
      for (const b of transactions) {
        if (b.sourceAccount === id && b.destinationAccount === a.id) {
          const link = this.getLink(b.transactionId, id, a.id);
          this.links.push(link);
          this.ogma.addEdge(link);
        } else if (b.destinationAccount === id && b.sourceAccount === a.id) {
          const link = this.getLink(b.transactionId, a.id, id);
          this.links.push(link);
          this.ogma.addEdge(link);
        }
      }
    }
    this.nodes.push(node);

    this.ogma.layouts.force({
      charge: 50,
      gravity: 0.01
    });
  }

  private getNode(id: string): any {
    let randomX = 0;
    while (randomX > 400 || randomX < 100) {
      randomX = Math.random() * this.width - this.width / 2;
    }
    // console.log("x is:" + randomX);
    let randomY = Math.random() * this.height - this.height / 2;

    while (randomY > 250 || randomY < 50) {
      randomY = Math.random() * this.height - this.height / 2;
    }
    // console.log("y is:" + randomY);


    const node = {
      id,
      data: {name: id},
      attributes: {x: randomX, y: randomY, radius: 20}
    };
    return node;
  }

  private async createLink(transactions: Transaction[]) {
    for (const transaction of transactions) {
      if (await this.service.getAccount(transaction.destinationAccount) == undefined || await this.service.getAccount(transaction.sourceAccount) == undefined) {
        continue;
      }
      await this.createNode(transaction.destinationAccount);
      await this.createNode(transaction.sourceAccount);
      if (this.checkLink(transaction.transactionId)) {
        continue
      }
      const link = this.getLink(transaction.transactionId, transaction.sourceAccount, transaction.destinationAccount);
      console.log(link);
      this.links.push(link);
      this.ogma.addEdge(link);
    }
    console.log("okokok");
  }

  private checkLink(id: string): boolean {
    for (const link of this.links) {
      if (id === link.id) {
        return true;
      }
    }
    return false;
  }

  private getLink(id: string, source: string, destination: string): any {
    const link = {
      id: id,
      source: source,
      target: destination,
      // data: {name: 'parent', color: 'red'},
      attributes: {
        shape: 'arrow'
      }
    };
    return link;
  }

  clear($event: MouseEvent) {
    const app = document.getElementById('account-info');
    app.removeChild(this.p);
    app.removeChild(this.p2);
    app.removeChild(this.p3);
    app.removeChild(this.p4);

  }
}

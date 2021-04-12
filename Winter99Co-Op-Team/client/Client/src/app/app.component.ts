import { Component, OnInit } from '@angular/core';
import * as Ogma from '../assets/ogma.min.js';
import { HttpClient } from '@angular/common/http';
import {AccountsService} from "./app/services/accounts.service";
import {Account} from "./models/Account";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Client';

  private ogma: Ogma;
  private nodes = [];
  private links = [];
  private nodesMaxCount = 10;
  private nodesCount: number;
  private linksCount: number;
  private width: number;
  private height: number;

  private account1: Account = {
    AccountType: "سپرده",
    BranchAdress: "تهران-خيابان شهيد مدنی-نبش خيابان اميرشرفی",
    BranchName: "امیر شرفی",
    BranchTelephone: "212154454",
    CardID: "6037699000000020",
    OwnerFamilyName: "سلامی",
    OwnerID: "122121",
    OwnerName: "سلام",
    Sheba: "IR033880987114000000028",
    AccountID: "4000000028"
  };
  private account2: Account = {
  AccountType: "سپرده",
  BranchAdress: "تهران-خيابان شهيد مدنی-نبش خيابان امیر غربی",
  BranchName: "امیر غربی",
  BranchTelephone: "9999999",
  CardID: "8888888",
  OwnerFamilyName: "خدافظی",
  OwnerID: "111111",
  OwnerName: "سلام",
  Sheba: "IR03388098788888888",
  AccountID: "78787878787"
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

    this.width = this.ogma.getContainer().offsetWidth;
    this.height = this.ogma.getContainer().offsetHeight;
    // graph-container width and height

    this.nodesCount = Math.floor(Math.random() * this.nodesMaxCount) + 1;
    this.linksCount = Math.floor(Math.random() * this.nodesMaxCount);
    // random nodes count and links count

    // creating nodes
    this.nodes = [];

    this.nodes.push(
      { id: 'n' + 1, data: { name: this.account1.AccountID + 1 }, attributes: { x: 20, y: 20, radius: 20, color:'red'  ,text: {content:"node1", color: '', style: 'bold' }}});

    this.nodes.push(
      { id: 'n' + 3, data: { name: this.account1.AccountID + 2 }, attributes: { x: 30, y: 40, radius: 20 }});


    this.nodes.push(
      { id: 'n' + 2, data: { name: this.account2.AccountID + 1 }, attributes: { x: 50, y: 50, radius: 20 }});


    this.ogma.addNodes(this.nodes);
    // adding created nodes to ogma


    // creating links
    this.links = [];

      const sourceId = 'n' + 1;
      const targetId = 'n' + 2;

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
        { id: 'e' + 1, source: sourceId, target: targetId, data: { name: 'parent' , color:'red'}}
      ); // data is a custom dictionary for containing data

    this.links.push(
      { id: 'e' + 2, source: 'n' +3, target: 'n' +1, data: { name: 'parent' } }
    ); // data is a custom dictionary for containing data

    this.ogma.addEdges(this.links);
    // adding created links to ogma
  }
}

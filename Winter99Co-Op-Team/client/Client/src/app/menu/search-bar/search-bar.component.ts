import {Component, OnInit, Output} from '@angular/core';
import { EventEmitter } from '@angular/core';
import {publish} from "rxjs/operators";
import {computeStartOfLinePositions} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/source_file";
import {Account} from "../../models/Account";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  public value = '';

  @Output()
  public searched:EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onClickGet(event: KeyboardEvent){
    this.searched.emit(this.value);
  }

}

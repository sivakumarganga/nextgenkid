import { Component, OnDestroy, OnInit } from '@angular/core';
import * as internal from 'stream';
import { SpeechService } from '../../core/services';
import { KeyElement } from './key-element';

@Component({
  selector: 'app-numbs-app',
  templateUrl: './numbs-app.component.html',
  styleUrls: ['./numbs-app.component.scss']
})
export class NumbsAppComponent implements OnInit, OnDestroy {

  public elements: Array<KeyElement> = [];
  private handleKeyBind: { () };

  constructor(private speechService: SpeechService) {
    this.handleKeyBind = this.handleKey.bind(this);
    document.addEventListener('keyup', this.handleKeyBind, false);
  }


  ngOnInit(): void {

  }
  private handleKey(event: any) {
    let character = String.fromCharCode(event.keyCode);
    let top = (window.innerHeight * Math.random());
    let left = (window.innerWidth * Math.random());
    var newElement = new KeyElement({ shape: character, fontSize: '70', xValue: left, yValue: top });
    this.elements.push(newElement);
    setTimeout(() => {
      newElement.FontSize='50';
    }, 500);
    setTimeout(() => {
      newElement.FontSize='40';
    }, 1000);
    // setTimeout(() => {
    //   this.elements = this.elements.filter(_ => _.TimeStamp != newElement.TimeStamp);
    // }, 2000);
  }


  ngOnDestroy(): void {
    document.removeEventListener('keyup', this.handleKeyBind, false);
    this.speechService.stop();
  }

}


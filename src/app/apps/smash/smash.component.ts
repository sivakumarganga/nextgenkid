import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SpeechService } from '../../core/services';
import { KeyElement } from './key-element';

@Component({
  selector: 'app-smash',
  templateUrl: './smash.component.html',
  styleUrls: ['./smash.component.scss']
})
export class SmashComponent implements OnInit, OnDestroy {

  public elements: Array<KeyElement> = [];
  private handleKeyBind: { () };

  constructor(private speechService: SpeechService) {
    this.handleKeyBind = this.handleKey.bind(this);
    document.addEventListener('keyup', this.handleKeyBind, false);
  }


  ngOnInit(): void {

  }
  private handleKey(event: any) {
    if(event.keyCode<48||event.keyCode>90)
    return;
    
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    let character = String.fromCharCode(event.keyCode);
    let top = ((window.innerHeight-120) * Math.random());
    let left = ((window.innerWidth-120) * Math.random());
    var newElement = new KeyElement({ shape: character, fontSize: '250', xValue: left, yValue: top,color:`#${randomColor}` });
    this.elements.push(newElement);
    setTimeout(() => {
      newElement.FontSize='150';
    }, 500);
    setTimeout(() => {
      newElement.FontSize='100';
    }, 1000);
    setTimeout(() => {
      this.elements = this.elements.filter(_ => _.TimeStamp != newElement.TimeStamp);
    }, 5000);
   // if(!this.speechService.isSpeaking()){
      this.speechService.speak(character);
   // }
  }


  ngOnDestroy(): void {
    document.removeEventListener('keyup', this.handleKeyBind, false);
    this.speechService.stop();
  }

}


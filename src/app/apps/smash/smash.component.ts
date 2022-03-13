import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SpeechService } from '../../core/services';

@Component({
  selector: 'app-smash',
  templateUrl: './smash.component.html',
  styleUrls: ['./smash.component.scss']
})
export class SmashComponent implements OnInit {
  private handleKeyBind: { () };
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  fontSize: number = 150;
  constructor(private speechService: SpeechService) {
    this.handleKeyBind = this.handleKey.bind(this);
    document.addEventListener('keyup', this.handleKeyBind, false);

  }

  ngOnInit(): void {
    this.canvas.nativeElement.width = window.innerWidth - 5;
    this.canvas.nativeElement.height = window.innerHeight - 5;
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }
  private handleKey(event: any) {
    this.draw(event.keyCode);
  }
  randomColors: Array<any> = [{ "start": "#2E3192", "end": " #1BFFFF" },
  { "start": "#D4145A ", "end": " #FBB03B" },
  { "start": "#009245 ", "end": " #FCEE21" },
  { "start": "#662D8C ", "end": " #ED1E79" },
  { "start": "#EE9CA7 ", "end": " #FFDDE1" }, { "start": "#614385 ", "end": " #516395" },
  { "start": "#02AABD ", "end": " #00CDAC" }, { "start": "#FF512F ", "end": " #DD2476" },
  { "start": "#FF5F6D ", "end": " #FFC371" }, { "start": "#11998E ", "end": " #38EF7D" }, { "start": "#C6EA8D ", "end": " #FE90AF" },
  { "start": "#EA8D8D ", "end": " #A890FE" }, { "start": "#D8B5FF ", "end": " #1EAE98" }, { "start": "#FF61D2 ", "end": " #FE9090" },
  { "start": "#BFF098 ", "end": " #6FD6FF" }, { "start": "#4E65FF ", "end": " #92EFFD" }, { "start": "#A9F1DF ", "end": " #FFBBBB" },
  { "start": "#C33764", "end": " #1D2671" }, { "start": "#93A5CF", "end": " #E4EfE9" }, { "start": "#868F96", "end": " #596164" },
  { "start": "#09203F", "end": " #537895" }, { "start": "#FFECD2", "end": " #FCB69F" }, { "start": "#A1C4FD", "end": " #C2E9FB" },
  { "start": "#764BA2", "end": " #667EEA" }, { "start": "#FDFCFB", "end": " #E2D1C3" }];

  randomGradient(size) {
    const gradient = this.ctx.createLinearGradient(0, 0, 500, 200);
    var color = this.randomColors[Math.floor(Math.random() * 25)];
    gradient.addColorStop(0, color.start);
    gradient.addColorStop(1, color.end);
    return gradient;
  }

  draw = (keyCode: number) => {
    this.ctx.font = `bold ${this.fontSize}px Verdana`;
    var x = Math.floor((Math.random() * this.canvas.nativeElement.width) + 1);
    var y = Math.floor((Math.random() * this.canvas.nativeElement.height) + 1);
    if(x<this.fontSize){
      x=this.fontSize;
    }
    if(y<this.fontSize){
     y=this.fontSize;
    }
    let character = String.fromCharCode(keyCode);
    console.log(x,y);
    this.ctx.fillStyle = this.randomGradient(12);;
    this.ctx.fillText(character, x, y);
    this.speechService.speak(character);
    setTimeout(() => {
      this.clear(character, x, y);
    }, 3000);
  }
  clear = (text: string, x: number, y: number) => {
    var metrics = this.ctx.measureText(text),
      rect = {
        x: x,
        y: y - this.fontSize + 2,
        width: metrics.width,
        height: this.fontSize,
      };
    switch (this.ctx.textAlign.toString()) {
      case 'center':
        rect.x = x - metrics.width / 2;
        break;
      case 'left':
        rect.x = x;
        break;
      case 'right':
        rect.x = x - metrics.width;
        break;
    }
    this.ctx.clearRect(rect.x, rect.y, rect.width, rect.height);
  }
}

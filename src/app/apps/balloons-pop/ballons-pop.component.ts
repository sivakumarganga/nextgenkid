import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewRef } from '@angular/core';
import { Balloon } from './balloon';

@Component({
  selector: 'app-ballons-pop',
  templateUrl: './balloons-pop.component.html',
  styleUrls: ['./balloons-pop.component.scss']
})
export class BalloonsPopComponent implements AfterViewInit {
  @ViewChild('playGround')
  playGround: ElementRef<HTMLDivElement>;

  isPaused = true;
  score = null;
  speed = null;
  density = null;
  remainingLives = 5;
  isPlayVisible: boolean = true;
  canvasElement: HTMLDivElement;
  timer = null;
  startedTime = null; //time from start game
  intervalId = null;
  updateTime = null;
  densityStep = null;
  balloonsArray = [];
  balloonBurstSoundEffectSrc:string="/assets/sounds/ballon-burst.wav";
  audioBalloonSound:HTMLAudioElement;
  constructor() {
    this.audioBalloonSound = new Audio(this.balloonBurstSoundEffectSrc);
  }

  ngAfterViewInit() {
    this.initGame(this.playGround.nativeElement);
  }
  ngOnInit(): void {
  }
  
  updater = () => {
    this.updateGame();
  }
  startGame() {
    this.isPlayVisible = false;
    this.intervalId = setInterval(this.updater, this.updateTime);

  };
 
  initGame(ce) {
    this.isPaused = true;
    this.score = 0;
    this.speed = 0.01;
    this.density = 1000 / 4000;
    this.remainingLives = 5;
    this.updateTime = 50;
    this.densityStep = 1;
    this.balloonsArray = [];
    this.canvasElement = ce;
  };

  popit = (b: Balloon) => {
    this.score = this.score + b.points;
    this.audioBalloonSound.play();
    b.removeFlag=true;
  }
  public generateRandomXPos(){
    //console.log('document width = ', Math.floor(Math.random() * 450));
    return Math.floor(Math.random() * this.playGround.nativeElement.offsetWidth);
  };
  updateGame() {
    this.densityStep += this.density;
    if (this.densityStep >= 1 && this.balloonsArray.length < 30) {
      for (var i = 0; i < parseInt(this.densityStep, 10); i++) {
        var tempBalloon = new Balloon(0, -53, 'green', 'normal', 150);
        tempBalloon.positionX = this.generateRandomXPos();
        tempBalloon.left = tempBalloon.positionX + 'px';
        tempBalloon.bottom = (tempBalloon.positionY + 100) + 'px';
        tempBalloon.speed = tempBalloon.getRandomSpeed();
        tempBalloon.points = tempBalloon.points;
        this.balloonsArray.push(tempBalloon);
      }
      this.densityStep = 0;
    }
    for (var i = 0; i < this.balloonsArray.length; i++) {
      let newBottom=(parseInt(this.balloonsArray[i].bottom, 10) + (3 + this.balloonsArray[i].speed));
      this.balloonsArray[i].bottom = newBottom + 'px';
      if(newBottom>(this.playGround.nativeElement.offsetHeight-55)){
        this.balloonsArray[i].removeFlag=true;
      }
    }
    this.balloonsArray = this.balloonsArray.filter(_ =>! _.removeFlag);
  }
  pauseGame() {
    clearInterval(this.intervalId);
  };


  endGame() {

  };

}


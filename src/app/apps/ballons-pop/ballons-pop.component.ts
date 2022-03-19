import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewRef } from '@angular/core';
import { Balloon } from './baloon';

@Component({
  selector: 'app-ballons-pop',
  templateUrl: './ballons-pop.component.html',
  styleUrls: ['./ballons-pop.component.scss']
})
export class BallonsPopComponent implements AfterViewInit {
  @ViewChild('playGround')
  playGround: ElementRef;

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
  constructor() {

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
    b.removeFlag=true;
  }
  updateGame() {
    this.densityStep += this.density;
    if (this.densityStep >= 1 && this.balloonsArray.length < 30) {
      for (var i = 0; i < parseInt(this.densityStep, 10); i++) {
        var tempBalloon = new Balloon(0, -53, 'green', 'normal', 150);
        tempBalloon.positionX = tempBalloon.generateRandomXPos();
        tempBalloon.left = tempBalloon.positionX + 'px';
        tempBalloon.bottom = (tempBalloon.positionY + 100) + 'px';
        tempBalloon.speed = tempBalloon.getRandomSpeed();
        tempBalloon.points = tempBalloon.points;
        this.balloonsArray.push(tempBalloon);
      }
      this.densityStep = 0;
    }
    for (var i = 0; i < this.balloonsArray.length; i++) {
      this.balloonsArray[i].bottom = (parseInt(this.balloonsArray[i].bottom, 10) + (3 + this.balloonsArray[i].speed)) + 'px';
    }
    this.balloonsArray = this.balloonsArray.filter(_ =>! _.removeFlag);
  }
  pauseGame() {
    clearInterval(this.intervalId);
  };


  endGame() {

  };

}


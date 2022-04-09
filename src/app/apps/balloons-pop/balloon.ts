export class Balloon {
    id:number;
    positionX: any;
    positionY: any;
    color: any;
    type: any;
    points: any;
    left: string;
    bottom: string;
    speed: number;
    removeFlag:boolean=false;
    constructor(x, y, color, type, points) {
      this.id=new Date().getTime();
      this.positionX = x;
      this.positionY = y;
      this.color = color;
      this.type = type;
      this.points = points;
    }
    public getRandomSpeed = function () {
      return Math.floor(Math.random() * 201) / 100;
    };
    public generateRandomXPos = function () {
      //console.log('document width = ', Math.floor(Math.random() * 450));
      return Math.floor(Math.random() * 450);
    };
  
  }
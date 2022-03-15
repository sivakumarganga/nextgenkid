import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SpeechService } from '../../core/services';

@Component({
  selector: 'app-video-destruction',
  templateUrl: './video-destruction.component.html',
  styleUrls: ['./video-destruction.component.scss']
})
export class VideoDestructionComponent implements OnInit {

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('sourcevideo', { static: true })
  sourceVideo: ElementRef<HTMLVideoElement>;

  @ViewChild('outputCanvas', { static: true })
  outputCanvas: ElementRef<HTMLCanvasElement>;
  
  public video:HTMLVideoElement;
  public  copy:CanvasRenderingContext2D;
  public  copycanvas:HTMLCanvasElement;
  public  draw:CanvasRenderingContext2D;
  
  public  TILE_WIDTH = 32;
  public  TILE_HEIGHT = 24;
  public  TILE_CENTER_WIDTH = 16;
  public  TILE_CENTER_HEIGHT = 12;
  public  SOURCERECT = {x:0, y:0, width:0, height:0};
  public  PAINTRECT = {x:0, y:0, width:1000, height:600};

  public RAD = Math.PI/180;
  public randomJump = false;
  public tiles:Array<any> = [];
  public debug = false;

  constructor(private speechService:SpeechService) { }
/*
function init(){
	video = document.getElementById('sourcevid');
	copycanvas = document.getElementById('sourcecopy');
	copy = copycanvas.getContext('2d');
	var outputcanvas = document.getElementById('output');
	draw = outputcanvas.getContext('2d');
	setInterval("processFrame()", 33);
}
*/
  ngOnInit(): void {
    // this.canvas.nativeElement.width = window.innerWidth - 5;
    // this.canvas.nativeElement.height = window.innerHeight - 5;
    this.video = this.sourceVideo.nativeElement;
    this.copycanvas = this.canvas.nativeElement;
    this.copy = this.copycanvas.getContext('2d');  
    
    this.draw = this.outputCanvas.nativeElement.getContext('2d');
    setInterval(()=>this.processFrame(), 33);
  }

  

  createTiles(){
    var offsetX = this.TILE_CENTER_WIDTH+(this.PAINTRECT.width-this.SOURCERECT.width)/2;
    var offsetY = this.TILE_CENTER_HEIGHT+(this.PAINTRECT.height-this.SOURCERECT.height)/2;
    var y=0;
    while(y < this.SOURCERECT.height){
      var x=0;
      while(x < this.SOURCERECT.width){
        var tile = new this.Tile();
        tile.videoX = x;
        tile.videoY = y;
        tile.originX = offsetX+x;
        tile.originY = offsetY+y;
        tile.currentX = tile.originX;
        tile.currentY = tile.originY;
        this.tiles.push(tile);
        x+=this.TILE_WIDTH;
      }
      y+=this.TILE_HEIGHT;
    }
  }
  

  processFrame(){
    if(!isNaN(this.video.duration)){
      if(this.SOURCERECT.width == 0){
        this.SOURCERECT = {x:0,y:0,width:this.video.videoWidth,height:this.video.videoHeight};
        this.createTiles();
      }
      //this is to keep my sanity while developing
      if(this.randomJump){
        this.randomJump = false;
        this.video.currentTime = Math.random()*this.video.duration;
      }
      //loop
      if(this.video.currentTime == this.video.duration){
        this.video.currentTime = 0;
      }
    }
    var debugStr = "";
    //copy tiles
    this.copy.drawImage(this.video, 0, 0);
    this.draw.clearRect(this.PAINTRECT.x, this.PAINTRECT.y,this.PAINTRECT.width,this.PAINTRECT.height);
    
    for(var i=0; i<this.tiles.length; i++){
      var tile = this.tiles[i];
      if(tile.force > 0.0001){
        //expand
        tile.moveX *= tile.force;
        tile.moveY *= tile.force;
        tile.moveRotation *= tile.force;
        tile.currentX += tile.moveX;
        tile.currentY += tile.moveY;
        tile.rotation += tile.moveRotation;
        tile.rotation %= 360;
        tile.force *= 0.9;
        if(tile.currentX <= 0 || tile.currentX >= this.PAINTRECT.width){
          tile.moveX *= -1;
        }
        if(tile.currentY <= 0 || tile.currentY >= this.PAINTRECT.height){
          tile.moveY *= -1;
        }
      }else if(tile.rotation != 0 || tile.currentX != tile.originX || tile.currentY != tile.originY){
        //contract
        var diffx = (tile.originX-tile.currentX)*0.2;
        var diffy = (tile.originY-tile.currentY)*0.2;
        var diffRot = (0-tile.rotation)*0.2;
        
        if(Math.abs(diffx) < 0.5){
          tile.currentX = tile.originX;
        }else{
          tile.currentX += diffx;
        }
        if(Math.abs(diffy) < 0.5){
          tile.currentY = tile.originY;
        }else{
          tile.currentY += diffy;
        }
        if(Math.abs(diffRot) < 0.5){
          tile.rotation = 0;
        }else{
          tile.rotation += diffRot;
        }
      }else{
        tile.force = 0;
      }
      this.draw.save();
      this.draw.translate(tile.currentX, tile.currentY);
      this.draw.rotate(tile.rotation*this.RAD);
      this.draw.drawImage(this.copycanvas, tile.videoX, tile.videoY, this.TILE_WIDTH, this.TILE_HEIGHT, -this.TILE_CENTER_WIDTH, -this.TILE_CENTER_HEIGHT, this.TILE_WIDTH, this.TILE_HEIGHT);
      this.draw.restore();
    }
    if(this.debug){
      this.debug = false;
      document.getElementById('trace').innerHTML = debugStr;
    }
  }
  
  explode(x, y){
    for(var i=0; i<this.tiles.length; i++){
      var tile = this.tiles[i];
      
      var xdiff = tile.currentX-x;
      var ydiff = tile.currentY-y;
      var dist = Math.sqrt(xdiff*xdiff + ydiff*ydiff);
      
      var randRange = 220+(Math.random()*30);
      var range = randRange-dist;
      var force = 3*(range/randRange);
      if(force > tile.force){
        tile.force = force;
        var radians = Math.atan2(ydiff, xdiff);
        tile.moveX = Math.cos(radians);
        tile.moveY = Math.sin(radians);
        tile.moveRotation = 0.5-Math.random();
      }
    }
    this.tiles.sort(this.zindexSort);
    this.processFrame();
  }
  zindexSort(a, b){
    return (a.force-b.force);
  }
  
  public dropBomb(evt, obj){
    obj=obj||this.outputCanvas.nativeElement;
    var posx = 0;
    var posy = 0;
    var e = evt || window.event;
    if (e.pageX || e.pageY){
      posx = e.pageX;
      posy = e.pageY;
    }else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    var canvasX = posx-obj.offsetLeft;
    var canvasY = posy-obj.offsetTop;
    this.explode(canvasX, canvasY);
    if(!this.speechService.isSpeaking()){
      this.speechService.speak("Well done!");
    }
  }
  
  Tile=function(){
    this.originX = 0;
    this.originY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.rotation = 0;
    this.force = 0;
    this.z = 0;
    this.moveX= 0;
    this.moveY= 0;
    this.moveRotation = 0;
    
    this.videoX = 0;
    this.videoY = 0;
  }
  
  
  /*
    getPixel
    return pixel object {r,g,b,a}
  */
  getPixel(imageData, x, y){
    var data = imageData.data;
    var pos = (x + y * imageData.width) * 4;
    return {r:data[pos], g:data[pos+1], b:data[pos+2], a:data[pos+3]}
  }
  /*
    setPixel
    set pixel object {r,g,b,a}
  */
  setPixel(imageData, x, y, pixel){
    var data = imageData.data;
    var pos = (x + y * imageData.width) * 4;
    data[pos] = pixel.r;
    data[pos+1] = pixel.g;
    data[pos+2] = pixel.b;
    data[pos+3] = pixel.a;
  }
  /*
    copyPixel
    faster then using getPixel/setPixel combo
  */
  copyPixel(sImageData, sx, sy, dImageData, dx, dy){
    var spos = (sx + sy * sImageData.width) * 4;
    var dpos = (dx + dy * dImageData.width) * 4;
    dImageData.data[dpos] = sImageData.data[spos];     //R
    dImageData.data[dpos+1] = sImageData.data[spos+1]; //G
    dImageData.data[dpos+2] = sImageData.data[spos+2]; //B
    dImageData.data[dpos+3] = sImageData.data[spos+3]; //A
  }
}

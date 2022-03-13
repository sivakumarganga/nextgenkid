import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { GalleryComponent } from '../gallery';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit  {
  @ViewChild("Canvas") Canvas: ElementRef;
  @ViewChild("canvasContainer") canvasContainer: ElementRef;
  @ViewChild("images") images: ElementRef;
  @ViewChild(GalleryComponent) gallery: GalleryComponent;


  private mousedown: boolean;
  private boundries: any;
  private ctx: CanvasRenderingContext2D;

  constructor() {}

  ngOnInit() {
    this.mousedown = false;
  }

  ngAfterViewInit() { // wait for the view to init before using the element
    this.boundries = this.canvasContainer.nativeElement.getBoundingClientRect();
    this.ctx = this.Canvas.nativeElement.getContext("2d");
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, 500, 500);
    this.ctx.lineWidth = 5;
    this.ctx.lineJoin = "round";
    this.ctx.lineCap = "round";
  }

  changeCurrent(e) {
    this.ctx = this.Canvas.nativeElement.getContext("2d");
    this.ctx.strokeStyle = e;
  }

  changeRange(e) {
    this.ctx = this.Canvas.nativeElement.getContext("2d");
    this.ctx.lineWidth = e;
  }

  drawLines(event) {
    if (!this.mousedown) return

    let x = this.getX(event);
    let y = this.getY(event);

    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }

  enableDrawning(e) {
    if (e.which != 1) return;

    this.mousedown = true;

    this.ctx.beginPath();
    this.ctx.moveTo(this.getX(e), this.getY(e));

    this.drawLines(e);
  }

  disableDrawning() {
    this.mousedown = false;
  }

  getX(e) {

    if (e.offsetX) {
      return e.offsetX;
    } else if (e.clientX) {
      return e.clientX - this.boundries.left;
    }
  }

  getY(e) {

    if (e.offsetY) {
      return e.offsetY;
    } else if (e.clientY) {
      return e.clientY - this.boundries.top;
    }
  }

  clearCanvas() {
    this.ctx.fillRect(0, 0, 500, 500);
    this.disableDrawning();
  }

  saveImage() {
    let img = new Image();
    img.setAttribute("style", "margin: 20px 0;")
    img.src = this.Canvas.nativeElement.toDataURL();
    this.gallery.addImageToGallery(img);
  }
}

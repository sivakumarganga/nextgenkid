export class KeyElement{
    TimeStamp:number;
    Shape:string;
    FontSize:string;
    XValue:string;
    YValue:string; 
   
    constructor(args:any={}) {
        this.Shape=args.shape||'';
        this.FontSize=args.fontSize||'0px';
        this.XValue=`${args.xValue||0}px`;
        this.YValue=`${args.yValue||0}px`;
        this.TimeStamp=new Date().getTime();
    }  
    
  }
class TurnTable {
  constructor(options){
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.pd = 20;

    this.canvas = document.getElementById(options.id);
    this.ctx = this.canvas.getContext('2d');

    this.bkCanvas = document.createElement('canvas');
    this.bkCtx = this.bkCanvas.getContext('2d');

    this.resources = [
      {
        id:1,
        text:'1',
        img:''
      },
      {
        id:2,
        text:'2',
        img:''
      },
      {
        id:3,
        text:'3',
        img:''
      },
      {
        id:4,
        text:'4',
        img:''
      },
      {
        id:5,
        text:'5',
        img:''
      },
      {
        id:6,
        text:'6',
        img:''
      },
      {
        id:7,
        text:'7',
        img:''
      },
      {
        id:8,
        text:'8',
        img:''
      }
    ]

    this.init();
  }

  init(){
    // 限制画布宽高
    this.canvas.width = this.bkCanvas.width = this.w >= 480 ? 480 : this.w <= 320 ? 320:this.w; 
    this.canvas.height = this.bkCanvas.height = this.h;

    this.render();
  }

  loadRecs(){

  }

  update(){

  }

  // 绘制转盘外层
  drawShell(){
    const ctx = this.bkCtx,
          r = this.canvas.width/2 - this.pd,
          r1 = this.canvas.width/2 - 3*this.pd,
          count = 16,
          self = this;
    // 转盘外层
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = '#47bec2';
    ctx.arc(self.canvas.width/2,self.canvas.height/2, r,0,Math.PI*2,true);
    ctx.fill();
    ctx.closePath();

    drawPolygon();

    // 绘制修饰点
    for(let i=1;i<=count;i++){
      var rt = 360 / count * i;
      if(i%2 == 0){
        drawPoint(rt);
      }else{
        drawRain(rt);
      }
    }

    // 绘制内圆
    ctx.beginPath();
    ctx.arc(self.canvas.width/2,self.canvas.height/2,r1,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.restore();

    // 绘制正多边形
    function drawPolygon(){
      ctx.save();
      ctx.beginPath();
      ctx.translate(self.canvas.width/2,self.canvas.height/2);

      ctx.moveTo(-r,0);
      for(let i=1;i<=count;i++){
        var rt = 360 / count * i;
        if(i%2 == 0){
          // 计算每个角度区间得 x,y值
          if(rt <= 90){
            ctx.lineTo(-Math.cos(getRadian(rt)) * r,Math.sin(getRadian(rt))*r);
          }else if(rt <= 180  && rt > 90){
            ctx.lineTo(Math.cos(getRadian(180-rt)) * r,Math.sin(getRadian(180-rt))*r);
          }else if(rt <= 270 && rt > 180){
            ctx.lineTo(Math.cos(getRadian(rt - 180)) * r,-Math.sin(getRadian(rt -180))*r);
          }else{
            ctx.lineTo(-Math.cos(getRadian(360 - rt)) * r,-Math.sin(getRadian(360 -rt))*r);
          }
        }
      }
      ctx.closePath();
      ctx.fillStyle = '#1e9a98';
      ctx.fill();
      ctx.restore();
    }

    // 角度转弧度
    function getRadian(ang){
      return ang * Math.PI /180;
    }

    // 圆点
    function drawPoint(rt){
      const pr = 10;
      ctx.save();
      // 旋转 
      ctx.translate(self.canvas.width/2,self.canvas.height/2);
      ctx.rotate(rt* Math.PI/180);

      ctx.beginPath();
      ctx.arc(-r,0,pr,0,Math.PI*2,true);
      ctx.closePath();
      ctx.fillStyle = '#ff8b3e';
      ctx.fill();
      ctx.restore();
    }

    // 雨滴
    function drawRain(x,y){
      ctx.save();
      // 旋转 
      ctx.translate(self.canvas.width/2,self.canvas.height/2);
      ctx.rotate(rt* Math.PI/180);

      ctx.beginPath();
      ctx.moveTo(-r-20,0);
      ctx.quadraticCurveTo(-r-15, 16, -r, 12);
      ctx.lineTo(-r+30,0);
      ctx.lineTo(-r,-12);
      ctx.quadraticCurveTo(-r-15, -16,-r-20,0);
      ctx.closePath();
      ctx.fillStyle = '#ffd13e';
      ctx.fill();
      ctx.restore();
    }
  }

  // 绘制转盘内层
  drawInner(){
    const ctx = this.bkCtx,
          r = this.canvas.width/2 - this.pd * 4.6,
          baseAng =  360 / this.resources.length/2;
    ctx.save();
    ctx.translate(this.canvas.width/2,this.canvas.height/2);
    for(let i =1;i<=this.resources.length;i++){
      var stAng = (360 / this.resources.length * i - baseAng) * Math.PI /180,
          edAnd = (360 / this.resources.length * (i+1)- baseAng) * Math.PI /180,
          color = '#ffffff';
      i % 2 == 0? color = '#ff8b3e':color = '#ffd13e';
      drawSector(stAng,edAnd,color);
    }
    ctx.restore();

    // 绘制扇形
    function drawSector(stAng,edAnd,color){
      ctx.beginPath();
      ctx.arc(0,0,r,stAng,edAnd,false);
      ctx.lineTo(0,0);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    }
  }

  // 绘制按钮
  drawBtn(){
    const ctx = this.bkCtx,
          r = this.canvas.width/2 - this.pd * 9,
          pd = 14;
    ctx.save();
    ctx.translate(this.canvas.width/2,this.canvas.height/2);
    // 透明区域
    ctx.save();
    ctx.globalAlpha = 0.2;
    ctx.beginPath();
    ctx.arc(0,0,r + 12,0,Math.PI*2,false);
    ctx.closePath();
    ctx.fillStyle = '#000000';
    ctx.fill();
    ctx.restore();

    ctx.beginPath();
    ctx.arc(0,0,r,0,Math.PI*2,false);
    ctx.closePath();
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0,0,r-pd,0,Math.PI*2,false);
    ctx.closePath();
    ctx.fillStyle = '#ed365e';
    ctx.fill();

    // 箭头
    ctx.beginPath();
    ctx.moveTo(0,-80);
    ctx.lineTo(-20,-r+pd+5);
    ctx.lineTo(20,-r+pd+5);
    ctx.closePath();
    ctx.fillStyle = '#ed365e';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0,0,r-pd -8,0,Math.PI*2,false);
    ctx.closePath();
    ctx.fillStyle = '#c52d54';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0,0,r-pd -8 -6,0,Math.PI*2,false);
    ctx.closePath();
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    ctx.font = '40px SimSun, Songti SC';
    ctx.fillStyle = '#f2345d';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('GO',0,0);

    ctx.restore();
  }

  render(){
    this.drawShell();
    this.drawInner();
    this.drawBtn();
    this.ctx.drawImage(this.bkCanvas,0,0);
  }
}
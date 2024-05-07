// function draw(){
//     var img = new Image();
//     img.src = 'chart.svg';
//     document.body.appendChild(img);
//     img.onload = function(){
//         var canvas = document.getElementById('canvas');
//         var g = canvas.getContext('2d'); 
//         var width = img.clientWidth;
//         var height = img.clientHeight;                
//         g.drawImage(img, 0, 0, width, height);     
//     };
// }
// // draw();
function draw() {
    const canvas = document.getElementById("jCanvas");
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");
  
      ctx.fillRect(25, 25, 100, 100);
      ctx.clearRect(45, 45, 60, 60);
      ctx.strokeRect(50, 50, 50, 50);
    }
  }
  
//   draw();

// https://github.com/haohailiang/manual/blob/master/canvas%E5%AE%9E%E7%94%A8%E6%89%8B%E5%86%8C.md
/*
 * 属性：lineCap
 * 属性值：butt(default)//一条平滑的边在线段的两边
 * 属性值：round	//两端是圆滑的接口
 * 属性值：square	//突出一块，记得要有参考线
 */
var canvas = document.getElementById("jCanvas");
canvas.width = 1024;	//设置宽高比较好的方法[尽量不要再CSS中设置]
canvas.height = 768;
var context = canvas.getContext('2d');

//参考线
context.beginPath();
context.strokeStyle = "#AAAAAA";
context.lineWidth = 1;
context.moveTo(200, 50);
context.lineTo(200, 800);
context.stroke();

context.moveTo(800, 50);
context.lineTo(800, 800);
context.stroke();
context.closePath();

context.lineWidth = 10;
context.strokeStyle = "teal";
context.beginPath();
context.moveTo(200, 100);
context.lineTo(800, 100);
context.lineCap = "butt";
context.stroke();
context.closePath();

context.beginPath();
context.moveTo(200, 400);
context.lineTo(800, 400);
context.lineCap = "round";
context.stroke();
context.closePath();

context.beginPath();
context.moveTo(200, 600);
context.lineTo(800, 600);
context.lineCap = "square";
context.stroke();
context.closePath();

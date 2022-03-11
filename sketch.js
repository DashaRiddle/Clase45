//Ancho y alto del tablero 
width = 11;
height = 11;

//Si tiro bien o no 
var hasWon = false;

let currentPlayerTurn = 0;

//Matriz para el tablero
board = [];
let position = 0;
let darkBox = false;

//Posición de serpientes y escaleras 
ladders = [{start:6, end:22},{start:67, end:87}]
//Crear cuadros para tablero 
for (var y = height; y >= 0; y--) {
  //Matriz para cuadros 
  let row = [];

  board.push(row);
  for (var x = 0; x < width; x++) {
    row.push({x,y,occupied: null,position,color: darkBox ? "#2B05F4" : "#FB040C"});
    //Intercala colores
    darkBox = !darkBox; //next one is not dark box
    position++;
  }
}

boardSize = 55;
//Dibuja el tablero
drawBoard = () => {
  let boardOnScreen = ``;
  board.forEach(row => {
    row.forEach(square => {
      boardOnScreen += `<div class=square style="top:${square.y *
        boardSize}px; left:${square.x *
        boardSize}px; background-color:${square.color}"></div>`;
    });
  });

  //Función para dibujar serpientes y escaleras 
 ladders.forEach(ladder=>{
   let startPose={x:0, y:0}
   let endPose={x:0, y:0}
   board.forEach(row=>{
     row.forEach(square=>{
      if(square.position===ladder.start){
        startPose.x=square.x*boardSize;
        startPose.y=square.y*boardSize;
      }
      if(square.position===ladder.end){
        endPose.x=square.x*boardSize;
        endPose.y=square.y*boardSize;
      }
     })
   })
   isLadder=ladder.end>ladder.start;
   drawLine({color:isLadder?"brown":"white",startPose,endPose});
 })
  
  //Obtiene datos de la pagina 
  document.getElementById("board").innerHTML = boardOnScreen;
};


//Asigna color a serpientes y escaleras 
function drawLine({color,startPose, endPose}){
  var canvas= document.getElementById("canvas");
  var diseño= canvas.getContext("2D");
  diseño.beginPath();
  diseño.moveTo(startPose.x+35,startPose.y+20);
  diseño.lineTo(endPose.x+25,endPose.y+25);
  diseño.lineWidth=17
  diseño.strokeStyle=color;
  diseño.stroke();
 }
drawBoard();

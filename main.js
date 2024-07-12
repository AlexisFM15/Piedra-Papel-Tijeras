import elementTemplate from "./element.js";
import box, { handlerMove } from "./board.js";
const boton = document.getElementById("boton");

//Creating elements
let elements = [
  new elementTemplate("piedra", box, 1),
  new elementTemplate("tijera", box, 2),
  new elementTemplate("papel", box, 3),
  new elementTemplate("piedra", box, 4),
  new elementTemplate("tijera", box, 5),
  new elementTemplate("papel", box, 6),
  new elementTemplate("piedra", box, 7),
  new elementTemplate("tijera", box, 8),
  new elementTemplate("papel", box, 9),
  new elementTemplate("piedra", box, 10),
  new elementTemplate("tijera", box, 11),
  new elementTemplate("papel", box, 12),
  new elementTemplate("piedra", box, 13),
  new elementTemplate("tijera", box, 14),
  new elementTemplate("papel", box, 15),
];

//start button
boton.addEventListener("click",_ => handlerMove(elements));

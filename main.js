import elementTemplate from "./element.js";
import box, { handlerMove } from "./board.js";
import { ELEMNTS_TYPES } from "./utils.js";
const boton = document.getElementById("boton");

//creating elements by a loop 
function createElement(quantity) {
  const element = [];
  const values = Object.values(ELEMNTS_TYPES);
  const valuesLength = values.length
  for (let i = 0; i < quantity; i++) {
    const randomIndex = Math.floor(Math.random() * valuesLength);
    element.push(new elementTemplate(values[randomIndex],box,i));
  }
  return element
}

//start the game
boton.addEventListener("click", (_) => handlerMove(createElement(40)));

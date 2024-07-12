import { boxBottom, boxRight } from "./board.js";
import { getRandomOpcion, ELEMNTS_TYPES, ELEMENTS_SOURCES } from "./utils.js";

export default class elementTemplate {
  src;
  tipo = ELEMNTS_TYPES.PIEDRA || ELEMNTS_TYPES.PAPEL || ELEMNTS_TYPES.TIJERA;
  width = `25px`;
  step = 10;
  node;

  constructor(tipo, box, id) {
    this.id = id;
    this.elementChoices(tipo);
    this.tipo = tipo;
    this.alt = "elemt";
    this.x = getRandomOpcion();
    this.y = getRandomOpcion();
    this.direccionX = getRandomOpcion() > 50 ? "derecha" : "izquierda";
    this.direccionY = getRandomOpcion() > 50 ? "arriba" : "abajo";
    this.createDomElement(box);
  }

  elementChoices(tipo) {
    if (tipo === ELEMNTS_TYPES.PIEDRA) {
      return (this.src = ELEMENTS_SOURCES.PIEDRASOURCE);
    }
    if (tipo === ELEMNTS_TYPES.TIJERA) {
      return (this.src = ELEMENTS_SOURCES.TIJERASOURCE);
    }
    if (tipo === ELEMNTS_TYPES.PAPEL) {
      return (this.src = ELEMENTS_SOURCES.PAPELSOURCE);
    }
  }

  createDomElement(box) {
    const elementNode = document.createElement("img");
    elementNode.style.top = "250px";
    elementNode.style.bottom = "0px";
    elementNode.style.right = "0px";
    elementNode.style.left = "445px";
    elementNode.style.width = this.width;
    elementNode.src = this.src;
    elementNode.alt = this.alt;
    elementNode.style.position = "absolute";
    box.appendChild(elementNode);
    return (this.node = elementNode);
  }
  // move on X forward
  moveFoward() {
    return (this.x += this.step);
  }

  // move on X backward
  moveBackward() {
    return (this.x -= this.step);
  }

  //move on Y up
  moveUp() {
    return (this.y -= this.step);
  }
  //move on Y down
  moveDown() {
    return (this.y += this.step);
  }
  //Change the y's direction
  getDirectionY() {
    if (this.y > boxBottom) {
      this.direccionY = "abajo";
    } else if (this.y < -boxBottom) {
      this.direccionY = "arriba";
    }
  }
  //Change the x's direction
  getDirectionX() {
    if (this.x > boxRight) {
      this.direccionX = "izquierda";
    } else if (this.x < -boxRight) {
      this.direccionX = "derecha";
    }
  }

  checkCollisions(element) {
    for (let i = 0; i < element.length; i++) {
      if (
        this.x >= element[i].x &&
        this.x <= element[i].x + 50 &&
        this.y >= element[i].y &&
        this.y <= element[i].y + 50
      ) {
        if (
          element[i].tipo === ELEMNTS_TYPES.PIEDRA &&
          this.tipo === ELEMNTS_TYPES.TIJERA
        ) {
          this.tipo = ELEMNTS_TYPES.PIEDRA;
          this.node.src = ELEMENTS_SOURCES.PIEDRASOURCE;
          this.step += 5;
          continue;
        } else if (
          element[i].tipo === ELEMNTS_TYPES.TIJERA &&
          this.tipo === ELEMNTS_TYPES.PAPEL
        ) {
          this.tipo = ELEMNTS_TYPES.TIJERA;
          this.node.src = ELEMENTS_SOURCES.TIJERASOURCE;
          this.step -= 5;
          continue;
        } else if (
          element[i].tipo === ELEMNTS_TYPES.PAPEL &&
          this.tipo === ELEMNTS_TYPES.PIEDRA
        ) {
          this.tipo = ELEMNTS_TYPES.PAPEL;
          this.node.src = ELEMENTS_SOURCES.PAPELSOURCE;
          this.step += 5;
          continue;
        }
      }
    }
  }

  // make the element bounce
  movement(element) {
    this.getDirectionX();
    this.getDirectionY();
    if (this.direccionX === "derecha" && this.direccionY === "arriba") {
      this.node.style.transform = `translate(${this.moveFoward()}px,${this.moveDown()}px)`;
    } else if (
      this.direccionX === "izquierda" &&
      this.direccionY === "arriba"
    ) {
      this.node.style.transform = `translate(${this.moveBackward()}px,${this.moveDown()}px)`;
    } else if (this.direccionX === "derecha" && this.direccionY === "abajo") {
      this.node.style.transform = `translate(${this.moveFoward()}px,${this.moveUp()}px)`;
    } else if (this.direccionX === "izquierda" && this.direccionY === "abajo") {
      this.node.style.transform = `translate(${this.moveBackward()}px,${this.moveUp()}px )`;
    }
    this.checkCollisions(element);
  }
}

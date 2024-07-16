import { boxBottom, boxRight } from "./board.js";
import { getRandomOpcion, ELEMNTS_TYPES, ELEMENTS_SOURCES } from "./utils.js";

export default class elementTemplate {
  src;
  tipo = ELEMNTS_TYPES.PIEDRA || ELEMNTS_TYPES.PAPEL || ELEMNTS_TYPES.TIJERA;
  width = `20px`;
  step = 10;
  node;

  constructor(tipo, box, id) {
    this.id = id; 
    this._elementChoices(tipo);
    this.tipo = tipo;
    this.alt = "elemt";
    this.x = getRandomOpcion();
    this.y = getRandomOpcion();
    this.direccionX = getRandomOpcion() > 50 ? "derecha" : "izquierda";
    this.direccionY = getRandomOpcion() > 50 ? "arriba" : "abajo";
    this._createDomElement(box);
  }
  _elementChoices(tipo) {
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

  _createDomElement(box) {
    const elementNode = document.createElement("img");
    elementNode.style.inset = "250px 0px 0px 445px"
    elementNode.style.width = this.width;
    elementNode.src = this.src;
    elementNode.alt = this.alt;
    elementNode.style.position = "absolute";
    box.appendChild(elementNode);
    return (this.node = elementNode);
  }
  // move on X forward
  _moveFoward() {
    return (this.x += this.step);
  }

  // move on X backward
  _moveBackward() {
    return (this.x -= this.step);
  }

  //move on Y up
  _moveUp() {
    return (this.y -= this.step);
  }
  //move on Y down
  _moveDown() {
    return (this.y += this.step);
  }
  //Change the y's direction
  _getDirectionY() {
    if (this.y > boxBottom) {
      this.direccionY = "abajo";
    } else if (this.y < -boxBottom) {
      this.direccionY = "arriba";
    }
  }
  //Change the x's direction
  _getDirectionX() {
    if (this.x > boxRight) {
      this.direccionX = "izquierda";
    } else if (this.x < -boxRight) {
      this.direccionX = "derecha";
    }
  }

  _checkCollisions(elements) {
    for (const element of elements) {
      if (
        this.x >= element.x &&
        this.x <= element.x + 25 &&
        this.y >= element.y &&
        this.y <= element.y + 35
      ) {
        if (
          element.tipo === ELEMNTS_TYPES.PIEDRA &&
          this.tipo === ELEMNTS_TYPES.TIJERA
        ) {
          this.tipo = ELEMNTS_TYPES.PIEDRA;
          this.node.src = ELEMENTS_SOURCES.PIEDRASOURCE;
          this.step += 2;
          break;
        } else if (
          element.tipo === ELEMNTS_TYPES.TIJERA &&
          this.tipo === ELEMNTS_TYPES.PAPEL
        ) {
          this.tipo = ELEMNTS_TYPES.TIJERA;
          this.node.src = ELEMENTS_SOURCES.TIJERASOURCE;
          this.step -= 2;
          break;
        } else if (
          element.tipo === ELEMNTS_TYPES.PAPEL &&
          this.tipo === ELEMNTS_TYPES.PIEDRA
        ) {
          this.tipo = ELEMNTS_TYPES.PAPEL;
          this.node.src = ELEMENTS_SOURCES.PAPELSOURCE;
          this.step += 2;
          break;
        }
      }
    }
  }

  // make the element bounce
  movement(element) {
    this._getDirectionX();
    this._getDirectionY();
    if (this.direccionX === "derecha" && this.direccionY === "arriba") {
      this.node.style.transform = `translate(${this._moveFoward()}px,${this._moveDown()}px)`;
    } else if (
      this.direccionX === "izquierda" &&
      this.direccionY === "arriba"
    ) {
      this.node.style.transform = `translate(${this._moveBackward()}px,${this._moveDown()}px)`;
    } else if (this.direccionX === "derecha" && this.direccionY === "abajo") {
      this.node.style.transform = `translate(${this._moveFoward()}px,${this._moveUp()}px)`;
    } else if (this.direccionX === "izquierda" && this.direccionY === "abajo") {
      this.node.style.transform = `translate(${this._moveBackward()}px,${this._moveUp()}px )`;
    }
    this._checkCollisions(element);
  }
}


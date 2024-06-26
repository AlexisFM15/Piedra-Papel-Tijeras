const caja = document.getElementById("Board");
const boton = document.getElementById("boton");
// const imgpiedra = document.getElementById("rock");

// getting box's dimensions
let boxTop = caja.offsetTop;
let boxBottom = caja.offsetHeight / 2.3;
let boxLeft = caja.offsetLeft;
let boxRight = window.outerWidth - caja.offsetWidth;

class element {
  id;
  src;
  alt;
  tipo = "piedra" || "papel" || "tijeras";
  width = `25px`;
  step = 5;
  node;

  constructor(tipo, caja, id) {
    this.id = id;
    this.elementChoices(tipo);
    this.tipo = tipo;
    this.alt = "elemt";
    this.x = Math.floor(Math.random() * 100);
    this.y = Math.floor(Math.random() * 100);
    this.direccionX = Math.floor(Math.random() * 1000) > 500 ? "derecha" : "izquierda";
    this.direccionY = Math.floor(Math.random() * 1000) > 500 ? "arriba" : "abajo";
    this.createDomElement(caja);
  }

  elementChoices(tipo) {
    if (tipo === "piedra") {
      return (this.src = "rock.png");
    }
    if (tipo === "tijera") {
      return (this.src = "tijera.png");
    }
    if (tipo === "papel") {
      return (this.src = "paper.png");
    }
  }

  createDomElement(caja) {
    const element1 = document.createElement("img");
    element1.style.top = "250px";
    element1.style.bottom = "0px";
    element1.style.right = "0px";
    element1.style.left = "445px";
    element1.style.width = this.width;
    element1.src = this.src;
    element1.alt = this.alt;
    element1.style.position = "absolute";
    caja.appendChild(element1);
    return (this.node = element1);
  }

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

  changeTheValue(element) {
    for (let i = 0; i < element.length - 1; i++) {
      if (element[i].offsetLeft === this.offsetLeft && element[i].offsetTop === this.offsetTop && element.id !== this.id) {
        if (element[i].tipo === "piedra" && this.tipo === "tijera" ) {
          this.node.src = element[i].src;
          this.tipo = element[i].tipo;
          break;
        } else if (element[i].tipo === "tijera" && this.tipo === "papel") {
          this.node.src = element[i].src;
          this.tipo = element[i].tipo;
          break;
        } else if (element[i].tipo === "papel" && this.tipo === "piedra") {
          this.node.src = element[i].src;
          this.tipo = element[i].tipo;
          break;
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
    this.changeTheValue(element);
  }
}

//Creating elements
const elements = [
  new element("piedra", caja, 1),
  new element("tijera", caja, 2),
  new element("papel", caja, 3),
  new element("piedra", caja,4),
  new element("tijera", caja,5),
  new element("papel", caja,6),
  new element("piedra", caja,7),
  new element("tijera", caja,8),
  new element("papel", caja,9),
  new element("piedra", caja,10),
  new element("tijera", caja,11),
  new element("papel", caja,12),
  new element("piedra", caja,13),
  new element("tijera", caja,14),
  new element("papel", caja,15),
];

//start button
boton.addEventListener("click", () => {
  for (let i = 0; i < elements.length; i++) {
    setInterval(function () {
      elements[i].movement(elements);
    }, 25);
  }
});

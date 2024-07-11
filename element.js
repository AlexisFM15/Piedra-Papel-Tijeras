export class element {
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
    this.direccionX =
      Math.floor(Math.random() * 1000) > 500 ? "derecha" : "izquierda";
    this.direccionY =
      Math.floor(Math.random() * 1000) > 500 ? "arriba" : "abajo";
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

  hitboxElement(enemy, ally) {
    let leftSide = enemy.offsetLeft;
    let topSide = enemy.offsetTop;
    let bottomSide = topSide + enemy.node.height;
    let rightSide = leftSide + enemy.node.width;
  }

  changeTheValue(element) {
    for (let i = 0; i < element.length; i++) {
      if (
        element[i].node.offsetLeft === this.node.offsetLeft ||
        element[i].node.offsetTop === this.node.offsetTop
      ) {
        if (element[i].tipo === "piedra" && this.tipo === "tijera") {
          this.node.src = element[i].src;
          this.tipo = element[i].tipo;
          console.log("tijera a piedra");
          break;
        } else if (element[i].tipo === "tijera" && this.tipo === "papel") {
          this.node.src = element[i].src;
          this.tipo = element[i].tipo;
          console.log("papel a tijera");
          break;
        } else if (element[i].tipo === "papel" && this.tipo === "piedra") {
          this.node.src = element[i].src;
          this.tipo = element[i].tipo;
          console.log("piedra a tijera");
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

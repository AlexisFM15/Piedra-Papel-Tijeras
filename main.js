const caja = document.getElementById("Board");
const boton = document.getElementById("boton");
// const imgpiedra = document.getElementById("rock");

// getting box's dimensions
let boxTop = caja.offsetTop;
let boxBottom = caja.offsetHeight / 2.3;
let boxLeft = caja.offsetLeft;
let boxRight = window.outerWidth - caja.offsetWidth;

class element {
  src;
  alt;
  direccionX;
  direccionY;
  width = `50px`;
  step = 5;
  y;
  x;
  node;

  constructor(src, alt) {
    this.src = src;
    this.alt = alt;
    this.direccionX = 'derecha';
    this.direccionY = 'abajo'
    this.x = 0;
    this.y  = 0;
    this.createDomElement()
  }

  createDomElement() {
    const element1 = document.createElement("img");
    element1.style.top = "250px";
    element1.style.bottom = "0px";
    element1.style.right = "0px";
    element1.style.left = "445px";
    element1.style.width = this.width
    element1.src = this.src
    element1.alt = this.alt
    element1.style.position = 'absolute'
    return this.node = element1;
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
  // make the element bounce 
  movement() {
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
    } else if (
      this.direccionX === "izquierda" &&
      this.direccionY === "abajo"
    ) {
      this.node.style.transform = `translate(${this.moveBackward()}px,${this.moveUp()}px )`;
    }
   }
}
// 
const nepiedra = new element("tijera.png", "tijera");
caja.appendChild(nepiedra.node)

//start button
boton.addEventListener("click", () => {
  console.log(nepiedra.x)
  console.log(nepiedra.y)
  setInterval(nepiedra.movement(), 100);
});
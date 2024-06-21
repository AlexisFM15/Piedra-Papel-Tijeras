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
  width = `50px`;
  step = 5;
  node;

  constructor(src, alt) {
    this.src = src;
    this.alt = alt;
    this.x = Math.floor(Math.random()*100);
    this.y = Math.floor(Math.random()*100);
    this.direccionX =Math.floor(Math.random()*100) > 50 ? "derecha" : "izquierda" 
    this.direccionY = Math.floor(Math.random()*100) > 50 ? "arriba" : "abajo" ;
    this.createDomElement();
  }

  createDomElement() {
    const element1 = document.createElement("img");
    element1.style.top = "250px";
    element1.style.bottom = "0px";
    element1.style.right = "0px";
    element1.style.left = "445px";
    element1.style.width = this.width;
    element1.src = this.src;
    element1.alt = this.alt;
    element1.style.position = "absolute";
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
  // make the element bounce
  movement() {
    this.getDirectionX();
    this.getDirectionY();
    if (this.direccionX === "derecha" && this.direccionY === "arriba") {
      return this.node.style.transform = `translate(${this.moveFoward()}px,${this.moveDown()}px)`;
    } 
    else if (
      this.direccionX === "izquierda" &&
      this.direccionY === "arriba"
    ) 
    {
      return this.node.style.transform = `translate(${this.moveBackward()}px,${this.moveDown()}px)`;
    } 
    else if (this.direccionX === "derecha" && this.direccionY === "abajo") 
      {
      return this.node.style.transform = `translate(${this.moveFoward()}px,${this.moveUp()}px)`;
    } 
    else if (this.direccionX === "izquierda" && this.direccionY === "abajo") 
      {
      return this.node.style.transform = `translate(${this.moveBackward()}px,${this.moveUp()}px )`;
    }
  }
}
//
const tijera = new element("tijera.png", "tijera");
caja.appendChild(tijera.node);
const piedra = new element("rock.png", "piedra");
caja.appendChild(piedra.node);


//start button
boton.addEventListener("click", () => {
  setInterval(function () { tijera.movement(); },25)
  setInterval(function () { piedra.movement(); },25)
});

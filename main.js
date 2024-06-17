let tijera = {
  src: "pngwing.com.png",
  alt: "imagen 1",
  width: 50,
  y: 0,
  x: 12,
};

let piedra = {
  src: "rock.png",
  alt: "imagen 1",
  direccionX: "derecha" || "izquierda",
  direccionY: "arriba" || "abajo",
  width: 50,
  step: 20,
  y: Math.floor(Math.random() * 100),
  x: Math.floor(Math.random() * 100),
};

//
const caja = document.getElementById("Board");
const boton = document.getElementById("boton");
const imgpiedra = document.getElementById("rock");

let boxTop = caja.offsetTop;
let boxBottom = window.outerHeight - caja.offsetHeight ;
let boxLeft = caja.offsetLeft;
let boxRight = window.outerWidth - caja.offsetWidth;

console.log(boxTop);
console.log(boxBottom);
console.log(boxLeft);
console.log(boxRight);

imgpiedra.style.top = `${0}px`;
imgpiedra.style.bottom = `${0}px`;
imgpiedra.style.right = "0px";
imgpiedra.style.left = "0px";


function moveBackward() {
  imgpiedra.style.transform = `translateX(${piedra.x}px)`;
  piedra.x -= piedra.step;
}

function moveFoward() {
  imgpiedra.style.transform = `translateX(${piedra.x}px)`;
  piedra.x += piedra.step;
}

function moveUp() {
  imgpiedra.style.top = piedra.y;
  piedra.y += piedra.step;
}

function moveDown() {
  imgpiedra.style.top = piedra.y;
  piedra.y -= piedra.step;
}
function getDirectionY() {
  if (piedra.y > boxBottom) {
    piedra.direccionY = "abajo";
  } else if (piedra.y < -boxBottom) {
    piedra.direccionY = "arriba";
  }
}

function getDirectionX() {
  if (piedra.x > boxRight) {
    piedra.direccionX = "izquierda";
  } else if (piedra.x < -boxRight) {
    piedra.direccionX = "derecha";
  }
}



function movement() {
  
  getDirectionY();
  getDirectionX();  
  if (piedra.direccionX === "derecha") {
    moveFoward();
  } else {
    moveBackward();
  }
  if (piedra.direccionY === "arriba") {
    moveUp();
  } else {
    moveDown();
  }
}

boton.addEventListener("click", () => {
  setInterval(movement, 100);
});


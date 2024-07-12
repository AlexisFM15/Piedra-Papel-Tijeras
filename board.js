const box = document.getElementById("Board");
const jsConfetti = new JSConfetti();

// getting box's dimensions
let boxTop = box.offsetTop;
export let boxBottom = box.offsetHeight / 2.3;
let boxLeft = box.offsetLeft;
export let boxRight = window.outerWidth - box.offsetWidth;

function celebration() {
  jsConfetti.addConfetti({
    emojis: ["🎉", "🥳", "👏", "⚡", "🎈"],
    emojiSize: 30,
    confettiNumber: 30,
    confettiColors: [
      "#ff0a54",
      "#ff477e",
      "#ff7096",
      "#ff85a1",
      "#fbb1bd",
      "#f9bec7",
    ],
  });
}

//when whole elements have the same type
function winCondition(elementsSet, intervalID) {
  let firstElement = elementsSet[0].tipo;
  let check = (ele) => ele.tipo === firstElement;
  if (elementsSet.every(check) === true) {
    clearInterval(intervalID);
    celebration();
  }
}

export function handlerMove(ele) {
    for (let i = 0; i < ele.length; i++) {
      let intervalo = setInterval(() => {
        ele[i].movement(ele);
        winCondition(ele, intervalo);
      }, 100);
    }
  }

export default box;

const box = document.getElementById("Board");
const jsConfetti = new JSConfetti();

// getting box's dimensions

export const boxBottom = box.offsetHeight / 2.3;
export const boxRight = window.outerWidth - box.offsetWidth;

function celebration() {
  jsConfetti.addConfetti({
    emojis: ["🎉", "🥳", "👏", "⚡", "🎈"],
    emojiSize: 30,
    confettiNumber: 50,
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
  const firstElement = elementsSet[0].tipo;
  const check = (el) => el.tipo === firstElement;
  if (elementsSet.every(check) === true) {
    clearInterval(intervalID);
    celebration();
  }
}

export function handlerMove(el) {
  for (const element of el) {
    const intervalo = setInterval(() => {
      element.movement(el);
      winCondition(el, intervalo);
    }, 100);
  }
}

export default box;

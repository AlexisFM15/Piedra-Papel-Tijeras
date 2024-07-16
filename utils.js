export const ELEMNTS_TYPES = Object.freeze({
  PIEDRA: "piedra",
  PAPEL: "papel",
  TIJERA: "tijera",
});

export const ELEMENTS_SOURCES = Object.freeze({
  PIEDRASOURCE: "images/rock.png",
  PAPELSOURCE: "images/paper.png",
  TIJERASOURCE: "images/tijera.png",
});

// export const MOVES = Object.freeze({
//   up: "arriba",
//   down: "abajo",
//   left: "izquierda",
//   right: "derecha"
// })

export const getRandomOpcion = () => {
  return Math.floor(Math.random() * 100);
};

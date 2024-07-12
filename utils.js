export const ELEMNTS_TYPES = Object.freeze({
  PIEDRA: "piedra",
  PAPEL: "papel",
  TIJERA: "tijera",
});

export const ELEMENTS_SOURCES = Object.freeze({
  PIEDRASOURCE: "rock.png",
  PAPELSOURCE: "paper.png",
  TIJERASOURCE: "tijera.png",
});

export const getRandomOpcion = () => {
  return Math.floor(Math.random() * 100);
};

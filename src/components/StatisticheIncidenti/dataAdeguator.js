export function adeguateData(raw_accidents) {
  return new Promise((res, reg) => {
    let formatted_accidents = [];
    raw_accidents.forEach(acc => {
      /* gravity: vertical, day :horizontal */
      if (acc) {
        let formatted_acc = acc;
        formatted_acc.ORARIO = Number(
          acc.DataOraIncidente.substring(11, 16).replace(":", ".")
        );
        formatted_acc.GIORNO = Number(acc.DataOraIncidente.substring(8, 11));
        formatted_acc.GRAVITA = determineGravity(acc);
        formatted_accidents.push(formatted_acc);
      }
    });
    res(formatted_accidents);
  });
}

function determineGravity({ NUM_MORTI, NUM_FERITI }) {
  let gravity = null;

  if (NUM_MORTI >= 1 || NUM_FERITI >= 4) {
    gravity = "alta";
  } else if (NUM_FERITI >= 2) {
    gravity = "media";
  } else if (NUM_FERITI >= 0) {
    gravity = "bassa";
  }
  return gravity;
}

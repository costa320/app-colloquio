import axios from "axios";

export function getAccidentsByPeriod(periodID) {
  const url = "api/accidents/getAccidentsPeriod/" + periodID;
  return new Promise((res, reg) => {
    axios
      .get(url)
      .then(response => {
        console.log(res);
        res(response);
      })
      .catch(function(error) {
        console.log(error);
        reg(error);
      });
  });
}

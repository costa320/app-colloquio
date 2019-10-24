import axios from "axios";

export function getUsers() {
  return new Promise((res, reg) => {
    axios
      .get(process.env.API_users + "/getUsers")
      .then(response => {
        console.log(res);
        res(response);
      })
      .catch(function(error) {
        console.log(error);
        if (process.env.enviroment === "DEV_START") {
          /* DEV_START ENABLED */
        } else {
          reg(error);
        }
      });
  });
}

import axios from "axios";

export function getUsers() {
  const url = "api/users/getUsers";
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

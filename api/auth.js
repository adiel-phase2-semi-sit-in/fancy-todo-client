import axios from "./axios";

// sign in
export const signIn = (email, password) =>
  new Promise((resolve, reject) => {
    axios
      .post("/users/signIn", {
        email,
        password
      })
      .then(({ data }) => {
        resolve(data.token);
      })
      .catch(err => reject(err));
  });

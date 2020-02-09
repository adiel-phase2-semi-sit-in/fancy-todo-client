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
      .catch(err => reject(err.response.data));
  });

// sign up
export const signUp = (email, password) =>
  new Promise((resolve, reject) => {
    axios
      .post("/users/signUp", {
        email,
        password
      })
      .then(({ data }) => {
        resolve(data.token);
      })
      .catch(err => reject(err.response.data));
  });

import axios from "./axios";

export const googleOauth = access_token =>
  new Promise((resolve, reject) => {
    axios
      .post(
        "/users/googleSignIn",
        {},
        {
          headers: {
            token: access_token
          }
        }
      )
      .then(({ data }) => {
        resolve(data.token);
      })
      .catch(err => reject(err));
  });

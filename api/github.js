import { loginWithGithub } from "github-oauth-popup";
import axios from "./axios";
const params = {
  client_id: process.env.GITHUB_CLIENT_ID,
  scope: "read:user"
};
export const githubOauth = () =>
  new Promise((resolve, reject) => {
    loginWithGithub(params)
      .then(response => {
        return axios({
          method: "GET",
          url: "/users/signIn/callback",
          headers: {
            code: response.code
          }
        });
      })
      .then(({ data }) => {
        resolve(data.token);
      })
      .catch(err => reject(err));
  });

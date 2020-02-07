import { googleOauth } from "../api/google";
import { signIn } from "../api/auth";
export const userSignIn = (email, password) => {
  signIn(email, password)
    .then(response => {
      localStorage.setItem("TOKEN", response);
    })
    .catch(err => console.log(err));
};
window.onSignIn = function gSignIn(googleUser) {
  const access_token = googleUser.getAuthResponse().id_token;
  googleOauth(access_token)
    .then(response => localStorage.setItem("GTOKEN", response))
    .catch(err => console.log(err));
};

export const onSignOut = () => {
  const auth = gapi.auth2.getAuthInstance();
  auth.signOut().then(response => {
    localStorage.clear();
  });
};

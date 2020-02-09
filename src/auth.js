import { googleOauth } from "../api/google";
import { signIn, signUp } from "../api/auth";
import { landingNav, dashboardNav, signInNav, errorToast } from "./nav";

export const userSignIn = (email, password) => {
  signIn(email, password)
    .then(response => {
      localStorage.setItem("TOKEN", response);
      dashboardNav();
    })
    .catch(err => errorToast(err));
};

export const userSignUp = (email, password) => {
  signUp(email, password)
    .then(response => {
      localStorage.setItem("TOKEN", response);
      dashboardNav();
    })
    .catch(err => errorToast(err));
};

window.onSignIn = function gSignIn(googleUser) {
  const access_token = googleUser.getAuthResponse().id_token;
  googleOauth(access_token)
    .then(response => {
      localStorage.setItem("TOKEN", response);
      dashboardNav();
    })
    .catch(err => errorToast(err));
};

export const onSignOut = () => {
  localStorage.clear();
  $("#content").empty();
  landingNav();
  signInNav();
  const auth = gapi.auth2.getAuthInstance();
  auth.signOut().then(response => {});
};

import { googleOauth } from "../api/google";
import { signIn, signUp } from "../api/auth";
import { landingNav, dashboardNav, signInNav, errorToast } from "./nav";
import { modalLoad } from "../index";

export const userSignIn = (email, password) => {
  modalLoad.open();
  signIn(email, password)
    .then(response => {
      modalLoad.close();
      localStorage.setItem("TOKEN", response);
      dashboardNav();
    })
    .catch(err => errorToast(err));
};

export const userSignUp = (email, password) => {
  modalLoad.open();
  signUp(email, password)
    .then(response => {
      modalLoad.close();
      localStorage.setItem("TOKEN", response);
      dashboardNav();
    })
    .catch(err => errorToast(err));
};

window.onSignIn = function gSignIn(googleUser) {
  modalLoad.open();
  const access_token = googleUser.getAuthResponse().id_token;
  googleOauth(access_token)
    .then(response => {
      modalLoad.close();
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

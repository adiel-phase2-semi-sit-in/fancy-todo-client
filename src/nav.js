import { loadTodo } from "../src/todo";
const signInForm = $("#sign-in-form");
const signUpForm = $("#sign-up-form");
const landingPage = $("#landing-page");
const dashboardPage = $("#dashboard-page");
const navbar = $("nav");

export const signInNav = () => {
  signUpForm.hide();
  signInForm.show();
};

export const signUpNav = () => {
  signInForm.hide();
  signUpForm.show();
};

export const landingNav = () => {
  navbar.hide();
  landingPage.show();
  dashboardPage.hide();
};

export const dashboardNav = () => {
  loadTodo();
  navbar.show();
  dashboardPage.show();
  landingPage.hide();
};

export const errorToast = message => {
  let html = "";
  if (Array.isArray(message)) {
    message.forEach(el => {
      html += `<li>${el}</li>`;
    });
  } else {
    html = `<li>${message}</li>`;
  }
  toastr.options.timeOut = 1500;
  toastr.options.extendedTimeOut = 1500;
  toastr.error(
    `
  <ul>
    ${html}
  </ul>`
  );
};

import { onSignOut, userSignIn, userSignUp } from "./src/auth";
import { githubOauth } from "./api/github";
import { signUpNav, signInNav, landingNav, dashboardNav } from "./src/nav";
import { loadTodo, submitTodo, updateTodoData } from "./src/todo";
import { errorToast } from "./src/nav";
const modalLoadElement = document.getElementById("modal1");
const modalFormElement = document.getElementById("modal-create");
const modalUpdateElement = document.getElementById("modal-update");
const dateElement = document.getElementById("due_date");
const dateUpdateElement = document.getElementById("due_date-update");
export const dateUpdatePicker = M.Datepicker.init(dateUpdateElement, {
  container: "body",
  format: "yyyy-mm-dd"
});
const datePicker = M.Datepicker.init(dateElement, {
  container: "body",
  format: "yyyy-mm-dd"
});
export const modalLoad = M.Modal.init(modalLoadElement, {
  dismissible: false
});
const modalForm = M.Modal.init(modalFormElement, {
  dismissible: false
});
export const modalUpdate = M.Modal.init(modalUpdateElement, {
  dismissible: false
});

//jquery
$(document).ready(() => {
  if (localStorage.TOKEN) {
    dashboardNav();
    loadTodo();
  } else {
    landingNav();
    signInNav();
  }

  //sign out button clicked
  $("#logout").click(function() {
    onSignOut();
  });

  // github button clicked
  $("#github-signIn").on("click", () => {
    githubOauth()
      .then(response => {
        dashboardNav();
        localStorage.setItem("TOKEN", response);
      })
      .catch(err => console(err));
  });

  //sign in button clicked
  $("#form-signIn").on("submit", e => {
    e.preventDefault();
    let user = {};
    $("input").each((i, el) => {
      user[$(el).attr("name")] = $(el).val();
    });
    userSignIn(user.email, user.password);
  });

  $("#form-signUp").on("submit", e => {
    e.preventDefault();
    let user = {};
    $("input").each((i, el) => {
      user[$(el).attr("name")] = $(el).val();
    });
    userSignUp(user.emailSignUp, user.passwordSignUp);
  });

  $("#sign-up-btn").on("click", () => {
    signUpNav();
  });
  $("#sign-in-btn").on("click", () => {
    signInNav();
  });
  $("#due_date").on("click", e => {
    e.preventDefault();
  });
  $("#create-todo").on("click", () => {
    modalForm.open();
  });
  $("#form-todo").on("submit", e => {
    modalForm.close();
    e.preventDefault();
    const due_date = datePicker.toString();
    const title = $("#title").val();
    const desc = $("#description").val();
    $("#title").val("");
    $("#description").val("");
    submitTodo(title, desc, due_date);
  });
  $("#close-create-form").on("click", () => {
    modalForm.close();
  });
  $("#close-update-form").on("click", () => {
    modalUpdate.close();
  });
  $("#form-update").on("submit", e => {
    modalUpdate.close();
    e.preventDefault();
    const { todoId } = $("#form-update").data();
    const title = $("#title-update").val();
    const desc = $("#description-update").val();
    const date = dateUpdatePicker.toString();
    updateTodoData(todoId, title, desc, date);
  });
});

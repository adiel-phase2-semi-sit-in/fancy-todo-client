import {
  getTodo,
  postTodo,
  deleteTodo,
  updateStatus,
  updateTodo
} from "../api/todo";
import image from "../assets/bg.jpg";
import { modalLoad, modalUpdate, dateUpdatePicker } from "../index";
import { errorToast } from "./nav";
let todos = [];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const loadTodo = () => {
  modalLoad.open();
  getTodo()
    .then(response => {
      todos = response;
      $("#content").empty();
      response.forEach((el, i) => {
        const checked = el.status ? "green" : "red";
        const status = el.status ? "Completed" : "Uncompleted";
        const d = new Date(el.due_date);
        const id = el.id;
        const date = `${
          months[d.getMonth()]
        } ${d.getDate()}, ${d.getFullYear()}`;
        $("#content").append(`
        <div class="col s4">
          <div class="card hoverable sticky-action">
            <div class="card-image" style="postition:relative;">
              <img
                src="${image}"
                style="width: 100%; height: 100%;"
              />
              <div id="action-${id}" class="fixed-action-btn" style="position:absolute; right: 0px; bottom: 0px;">
              <a class="dropdown-trigger btn-floating halfway-fab waves-effect waves-light green">
                <i class="material-icons">menu</i>
              </a>
              <ul style="position: absolute; top: 38px; left: -90px;">
                <li><a id="delete-${id}" class="btn-floating red"><i class="material-icons">delete_forever</i></a></li>
                <li><a id="edit-${id}" class="btn-floating blue"><i class="material-icons">edit</i></a></li>
              </ul>
            </div>
            </div>
            <div class="card-content">
              <span class="card-title grey-text text-darken-4">${el.title}</span>
              <p>${date}</p>
            </div>
            <div class="card-action" style="display: flex; justify-content: space-between">
              <a id="desc-${id}" class="desc valign-wrapper" href="">
                <span class="activator">Description</span>
              </a>
              <div id="update-${id}" class="chip mr-0 mb-0 ml-0 ${checked} white-text valign-wrapper hoverable" style="cursor: pointer;"> 
                ${status}
              </div>
            </div>
            <div class="card-reveal">
              <span id="close-${id}" class="close-btn card-title grey-text text-darken-4"
                >${el.title}<i class="material-icons right">close</i></span>
              <p>
              ${el.description}
              </p>
            </div>
          </div>
        </div>
      `);
      });
      modalLoad.close();
      const elems = document.querySelectorAll(".fixed-action-btn");
      const instances = M.FloatingActionButton.init(elems, {
        direction: "bottom",
        hoverEnabled: false
      });
      $(".desc").on("click", function(e) {
        e.preventDefault();
        const [name, id] = $(this)
          .attr("id")
          .split("-");
        $(`#action-${id}`).addClass("z-ul");
      });
      $(".close-btn").on("click", function(e) {
        $(".fixed-action-btn").removeClass("z-ul");
      });
      $("li a").on("click", function(e) {
        e.preventDefault();
        const [opt, id] = $(this)
          .attr("id")
          .split("-");
        if (opt == "delete") {
          removeTodo(id);
        } else if (opt == "edit") {
          modalUpdate.open();
          const todo = todos.find(el => el.id == id);
          $("#form-update").data("todoId", todo.id);
          $("#title-update").val(todo.title);
          $("#description-update").val(todo.description);
          dateUpdatePicker.setDate(new Date(todo.due_date));
        }
      });
      $(".chip").on("click", function() {
        const status = $(this).attr("id");
        const id = status.split("-")[1];
        const value = $(this)
          .text()
          .trim();
        const updValue = value == "Uncompleted" ? true : false;
        updateTodoStatus(id, updValue);
      });
    })
    .catch(err => errorToast(err.response.data));
};

export const submitTodo = (title, desc, due_date) => {
  modalLoad.open();
  postTodo(title, desc, due_date)
    .then(response => {
      modalLoad.close();
      loadTodo();
    })
    .catch(err => errorToast(err.response.data));
};

export const removeTodo = id => {
  modalLoad.open();
  deleteTodo(id)
    .then(response => {
      modalLoad.close();
      loadTodo();
    })
    .catch(err => errorToast(err.response.data));
};

export const updateTodoStatus = (id, value) => {
  updateStatus(id, value)
    .then(response => {
      loadTodo();
    })
    .catch(err => errorToast(err.response.data));
};

export const updateTodoData = (id, title, desc, due_date) => {
  updateTodo(id, title, desc, due_date)
    .then(response => {
      loadTodo();
    })
    .catch(err => errorToast(err.response.data));
};

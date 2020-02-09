import axios from "./axios";

export const getTodo = () =>
  new Promise((resolve, reject) => {
    axios
      .get("/todos", {
        headers: {
          token: localStorage.TOKEN
        }
      })
      .then(({ data }) => {
        resolve(data);
      })
      .catch(err => reject(err));
  });

export const postTodo = (title, description, due_date) =>
  new Promise((resolve, reject) => {
    axios
      .post(
        "/todos",
        {
          title,
          description,
          due_date
        },
        {
          headers: {
            token: localStorage.TOKEN
          }
        }
      )
      .then(({ data }) => {
        resolve(data);
      })
      .catch(err => reject(err.response.data));
  });

export const deleteTodo = id =>
  new Promise((resolve, reject) => {
    axios
      .delete(`/todos/${id}`, {
        headers: {
          token: localStorage.TOKEN
        }
      })
      .then(({ data }) => {
        resolve(data);
      })
      .catch(err => reject(err));
  });

export const updateStatus = (id, status) =>
  new Promise((resolve, reject) => {
    axios
      .put(
        `/todos/${id}`,
        {
          status
        },
        {
          headers: {
            token: localStorage.TOKEN
          }
        }
      )
      .then(({ data }) => {
        resolve(data);
      })
      .catch(err => reject(err));
  });

export const updateTodo = (id, title, description, due_date) =>
  new Promise((resolve, reject) => {
    axios
      .put(
        `/todos/${id}`,
        {
          title,
          description,
          due_date
        },
        {
          headers: {
            token: localStorage.TOKEN
          }
        }
      )
      .then(({ data }) => {
        resolve(data);
      })
      .catch(err => reject(err));
  });

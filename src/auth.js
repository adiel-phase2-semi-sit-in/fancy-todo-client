const BASEURL = "http://localhost:3000/users";

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  axios({
    method: "POST",
    url: `${BASEURL}/googleSignIn`,
    headers: {
      token: id_token
    }
  })
    .then(({ data }) => {
      localStorage.setItem("token", data.token);
    })
    .catch(err => console.log(err));
}

function signIn() {
  axios({
    method: "POST",
    url: `${BASEURL}/signIn`,
    data: {
      email: "",
      password: ""
    }
  })
    .then(({ data }) => {
      console.log(data);
    })
    .catch(err => console.log(err));
}

function onSignOut() {
  const auth = gapi.auth2.getAuthInstance();
  auth.signOut().then(response => {
    localStorage.clear();
  });
}

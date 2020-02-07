// export function signIn() {
//   axios({
//     method: "POST",
//     url: `${BASEURL}/signIn`,
//     data: {
//       email: "",
//       password: ""
//     }
//   })
//     .then(({ data }) => {
//       console.log(data);
//     })
//     .catch(err => console.log(err));
// }
function gSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  axios({
    method: "POST",
    url: `${MyFunc.BASEURL}/googleSignIn`,
    headers: {
      token: id_token
    }
  })
    .then(({ data }) => {
      localStorage.setItem("token", data.token);
    })
    .catch(err => console.log(err));
}

export function onSignOut() {
  const auth = gapi.auth2.getAuthInstance();
  auth.signOut().then(response => {
    localStorage.clear();
  });
}
window.onSignIn = gSignIn;

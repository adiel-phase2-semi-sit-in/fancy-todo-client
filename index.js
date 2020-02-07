import { onSignOut } from "./src/auth";
import { githubOauth } from "./api/github";

//jquery
$(document).ready(function() {
  $("#logout").click(function() {
    onSignOut();
  });
  if (localStorage.token) {
    $("#dashboard").show();
    $("#landing-page").hide();
  } else {
    $("#dashboard").hide();
    $("#landing-page").show();
  }
  $("#github-signIn").on("click", function() {
    githubOauth()
      .then(response => console.log(response))
      .catch(err => console.log(err));
  });
});

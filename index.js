import { onSignOut, userSignIn } from "./src/auth";
import { githubOauth } from "./api/github";

//jquery
$(document).ready(function() {
  if (localStorage.token) {
    $("#dashboard").show();
    $("#landing-page").hide();
  } else {
    $("#dashboard").hide();
    $("#landing-page").show();
  }

  //sign out button clicked
  $("#logout").click(function() {
    onSignOut();
  });

  // github button clicked
  $("#github-signIn").on("click", function() {
    githubOauth()
      .then(response => console.log(response))
      .catch(err => console.log(err));
  });

  $("#form-signIn").on("submit", function(e) {
    e.preventDefault();
    const input = $(".input-group").length;
    $(input).each(function(i, value) {
      console.log(value);
      console.log($(".input-group input").val());
    });
  });
});

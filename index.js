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
});

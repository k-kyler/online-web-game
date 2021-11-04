$(document).ready(() => {
  // Force setting modal to hide when open exit game modal
  $("#exitGameConfirm").click(() => {
    $("#myModal1").modal("hide");
    $(".modal-backdrop").css("display", "none");
  });
});

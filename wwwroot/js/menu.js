$(document).ready(() => {
    // Force setting modal to hide when open exit game modal
    $("#exitGameConfirm").click(() => {
        $("#myModal1").modal("hide");
        $(".modal-backdrop").css("display", "none");
    });

    // Press to open Settings modal
    $(document).keydown((e) => {
        if (e.keyCode == 27) {
            if ($("#myModal1").modal("hide")) {
                $("#myModal1").modal("show");
                $("#myModal2").modal("hide");
                $(".modal-backdrop").css("display", "none");
            }
            else if ($("#myModal1").modal("show")) {
                $("#myModal1").modal("hide");
                $(".modal-backdrop").css("display", "none");
            }
        }
    });
});



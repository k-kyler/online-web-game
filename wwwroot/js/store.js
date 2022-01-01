$(document).ready(() => {
    let userInfoId = ""
    let stamina = 0
    let level = 0
    let exp = 0
    let coin = 0
    async function getUserInfo() {
        try {
            const response = await fetch(`${DEV_URL}/userinfo`);
            const res = await response.json()


            userInfoId = res.infoId
            stamina = res.stamina
            level = res.level
            exp = res.exp
            coin = res.coin
        }
        catch (err) {
            console.log(err)
        }
    }
    getUserInfo()

    async function setUserInfo() {
        try {

            await fetch(`${DEV_URL}/userinfo/update`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    UserInfoId: userInfoId,
                    Stamina: stamina,
                    Level: level,
                    Exp: exp,
                    Coin: coin
                }),
            })
        }
        catch (err) {
            console.log(err)
        }
    }

  // Open stamina store modal
  $("#storeTrigger").click(() => {
      $("#storeModal").modal("show");
      getUserInfo()
      $('#dp-coin').html("Coin: " + coin)
  });

  // Press B to stamina store modal
  $(document).keydown((event) => {
    if (event.key === "b") {
      if ($("#storeModal").modal("hide")) {
          $("#storeModal").modal("show");
          getUserInfo()
          $('#dp-coin').html("Coin: " + coin)
      } else if ($("#storeModal").modal("show")) {
        $("#storeModal").modal("hide");
      }
    }
  });

   
    $("#buy-sta-10").click(() => {
        if (coin >= 10) {
            if (stamina <= 290) {
                stamina += 10
                coin -= 10
                setUserInfo()

                $('#dp-stamina').html(stamina + "%")
                $('#dp-stamina-progress').css("width", stamina + "%")
                $('#dp-coin').html("Coin: " + coin)
                $('#dp-error-message').html("")
                $('#dp-success-message').html("Purchased!!!")
            }
            else {
                $('#dp-success-message').html("")
                $('#dp-error-message').html("Your stamina is full")
            }
        }
        else {
            $('#dp-success-message').html("")
            $('#dp-error-message').html("Your coin is not enough")
        }
    });

    $("#buy-sta-30").click(() => {
        if (coin >= 25) {
            if (stamina <= 270) {
                stamina += 30
                coin -= 25
                setUserInfo()

                $('#dp-stamina').html(stamina + "%")
                $('#dp-stamina-progress').css("width", stamina + "%")
                $('#dp-coin').html("Coin: " + coin)
                $('#dp-error-message').html("")
                $('#dp-success-message').html("Purchased!!!")
            }
            else {
                $('#dp-success-message').html("")
                $('#dp-error-message').html("Your stamina is full")
            }
        }
        else {
            $('#dp-success-message').html("")
            $('#dp-error-message').html("Your coin is not enough")
        }
    });

    $("#buy-sta-50").click(() => {
        if (coin >= 40) {
            if (stamina <= 250) {
                stamina += 50
                coin -= 40
                setUserInfo()

                $('#dp-stamina').html(stamina + "%")
                $('#dp-stamina-progress').css("width", stamina + "%")
                $('#dp-coin').html("Coin: " + coin)
                $('#dp-error-message').html("")
                $('#dp-success-message').html("Purchased!!!")
            }
            else {
                $('#dp-success-message').html("")
                $('#dp-error-message').html("Your stamina is full")
            }
        }
        else {
            $('#dp-success-message').html("")
            $('#dp-error-message').html("Your coin is not enough")
        }
    });
});

$(document).ready(function () {
    const flappyCanvas = document.getElementById("flappyCanvas")
    const flappyCtx = flappyCanvas.getContext("2d")

    let flappyFrames = 0

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

    function restartGame() {
        coin += score.value
        exp += (score.value * 2)
        level = Math.ceil(exp / 1000)

        setUserInfo()

        $('#playerLevel').html(level)
        $('#dp-stamina').html(stamina + "%")
        $('#dp-stamina-progress').css("width", stamina + "%")
        $('#dp-exp').html(Math.ceil((exp % 1000) * 100 / 1000) + "%")
        $('#dp-exp-progress').css("width", Math.ceil((exp % 1000) * 100 / 1000) + "%")
        $('#dp-coin').html("Coin: " + coin)
    }

    const flappyBackgroundImg = new Image()
    flappyBackgroundImg.src = "../assets/flappy-background.jpg"

    const flappyForegroundImg = new Image()
    flappyForegroundImg.src = "../assets/flappy-foreground.png"

    const flappySpaceshipImg = new Image()
    flappySpaceshipImg.src = "../assets/flappy-spaceship.png"

    const flappyPipeImg = new Image()
    flappyPipeImg.src = "../assets/flappy-pipes.png"

    //Game state
    const flappyGameState = {
        current: 0,
        ready: 0,
        playing: 1,
        over: 2,
    }

    flappyCanvas.addEventListener("click", e => {
        switch (flappyGameState.current) {
            case flappyGameState.ready:
                if (stamina >= 10) {
                    stamina -= 10
                }
                else {
                    console.log("You don't have enough stamina")
                    break
                }

                flappyGameState.current = flappyGameState.playing
                break
            case flappyGameState.playing:
                spaceship.flap()
                break
            case flappyGameState.over:
                let rect = flappyCanvas.getBoundingClientRect()
                //Get user click x and y position
                let x = e.clientX - rect.left
                let y = e.clientY - rect.top
                if (x >= restartBtn.x && x <= restartBtn.x + restartBtn.w && y >= restartBtn.y && y <= restartBtn.y + restartBtn.h) { //Check user click on the Start button
                    spaceship.reset()
                    pipe.reset()
                    score.reset()
                    getUserInfo()
                    flappyGameState.current = flappyGameState.ready
                }
                break
        }
    })

    //Backgroud
    const flappyBackground = {
        sX: 0,
        sY: 0,
        w: 320,
        h: 470,
        x: 0,
        y: flappyCanvas.height - 226,
        draw: function () {
            flappyCtx.drawImage(flappyBackgroundImg, this.sX, this.sY, this.w, this.h)

        }
    }

    //Foreground
    const flappyForeground = {
        sX: 0,
        sY: 0,
        w: 223,
        h: 112,
        x: 0,
        y: flappyCanvas.height - 112,
        dx: 1.5,
        draw: function () {
            flappyCtx.drawImage(flappyForegroundImg, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h)
            flappyCtx.drawImage(flappyForegroundImg, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h)
        },

        update: function () {
            if (flappyGameState.current == flappyGameState.playing) {
                this.x = (this.x - this.dx) % (this.w / 2)
            }
        }
    }

    //spaceship
    const spaceship = {
        sX: 57,
        sY: 26,
        sW: 842 - 26,
        sH: 842 - 57,
        x: 50,
        y: 150,
        w: 34,
        h: 26,

        speed: 0,
        gravity: 0.05,
        jump: 1.5,
        radius: 12,

        draw: function () {
            flappyCtx.drawImage(flappySpaceshipImg, this.sX, this.sY, this.sW, this.sH, this.x - this.w / 2, this.y - this.h / 2, this.w, this.h)
        },

        update: function () {
            if (flappyGameState.current == flappyGameState.ready) {
                this.y = 150
            }
            else {
                this.speed += this.gravity
                this.y += this.speed
                if (this.y + this.h / 2 >= flappyCanvas.height - flappyForeground.h / 2) {

                    if (flappyGameState.current == flappyGameState.playing) {
                        restartGame()
                        flappyGameState.current = flappyGameState.over
                    }
                }
            }
        },

        flap: function () {
            this.speed = -this.jump
        },
        reset: function () {
            this.speed = 0
        }
    }

    //Pipes
    const pipe = {
        top: {
            sX: 52,
            sY: 0,
        },
        bottom: {
            sX: 0,
            sY: 0,
        },
        w: 52,
        h: 400,
        position: [],
        gap: 85,
        dx: 1.5,
        maxYPos: -150,

        draw: function () {
            for (let i = 0; i < this.position.length; i++) {
                let pos = this.position[i]

                //Top pipe
                flappyCtx.drawImage(flappyPipeImg, this.top.sX, this.top.sY, this.w, this.h, pos.x, pos.y, this.w, this.h)

                //Bottom pipe
                flappyCtx.drawImage(flappyPipeImg, this.bottom.sX, this.bottom.sY, this.w, this.h, pos.x, pos.y + this.h + this.gap, this.w, this.h)
            }
        },

        update: function () {
            if (flappyGameState.current != flappyGameState.playing) {
                return
            }
            if (flappyFrames % 150 == 0) {
                this.position.push({
                    x: flappyCanvas.width,
                    y: this.maxYPos * (Math.random() + 1)
                })
            }
            for (let i = 0; i < this.position.length; i++) {
                let pos = this.position[i]

                let bottomYPos = pos.y + this.h + this.gap

                //Checking Collision
                //Top pipe
                if ((spaceship.x + spaceship.radius > pos.x) && (spaceship.x - spaceship.radius < pos.x + this.w) && (spaceship.y + spaceship.radius > pos.y) && (spaceship.y - spaceship.radius < pos.y + this.h)) {
                    restartGame()
                    flappyGameState.current = flappyGameState.over;
                }
                //Bottom pipe
                if ((spaceship.x + spaceship.radius > pos.x) && (spaceship.x - spaceship.radius < pos.x + this.w) && (spaceship.y + spaceship.radius > bottomYPos) && (spaceship.y - spaceship.radius < bottomYPos + this.h)) {
                    restartGame()
                    flappyGameState.current = flappyGameState.over;
                }


                pos.x -= this.dx
                if (pos.x + this.w <= 0) {
                    this.position.shift()
                    score.value += 1

                    score.best = Math.max(score.value, score.best)
                    localStorage.setItem("best", score.best)
                }
            }
        },

        reset: function () {
            pipe.position = []
        }
    }



    //Ready message
    const readyMessage = {
        w: 173,
        h: 100,
        x: flappyCanvas.width / 2 - 173 / 2,
        y: flappyCanvas.width / 2,

        draw: function () {
            if (flappyGameState.current == flappyGameState.ready) {
                flappyCtx.fillStyle = "#785d19"
                flappyCtx.fillRect(this.x - 10, this.y - 10, this.w + 20, this.h + 20)

                flappyCtx.fillStyle = "#004614"
                flappyCtx.fillRect(this.x, this.y, this.w, this.h)

                flappyCtx.fillStyle = "white"
                flappyCtx.font = "25px Arial"
                flappyCtx.fillText("Get Ready", this.x + 24, this.y + 35)

                flappyCtx.fillStyle = "white"
                flappyCtx.font = "15px Arial"
                flappyCtx.fillText("Click to play", this.x + 42, this.y + 75)
            }
        }
    }

    //Gameover message
    const gameOverMessage = {
        sX: 175,
        sY: 228,
        w: 225,
        h: 202,
        x: flappyCanvas.width / 2 - 225 / 2,
        y: 90,

        draw: function () {
            if (flappyGameState.current == flappyGameState.over) {
                flappyCtx.fillStyle = "#785d19"
                flappyCtx.fillRect(this.x - 10, this.y - 10, this.w + 20, this.h + 20)

                flappyCtx.fillStyle = "#004614"
                flappyCtx.fillRect(this.x, this.y, this.w, this.h)

                flappyCtx.fillStyle = "white"
                flappyCtx.font = "25px Arial"
                flappyCtx.fillText("Game Over", this.x + 45, this.y + 35)

                flappyCtx.fillStyle = "white"
                flappyCtx.font = "20px Arial"
                flappyCtx.fillText("Score", 80, 170)
                flappyCtx.fillText("Best Score", 80, 200)

                flappyCtx.fillStyle = "#785d19"
                flappyCtx.fillRect(restartBtn.x, restartBtn.y, restartBtn.w, restartBtn.h)

                flappyCtx.fillStyle = "white"
                flappyCtx.font = "20px Arial"
                flappyCtx.fillText("Restart", restartBtn.x + 8, restartBtn.y + 23)
            }
        }
    }

    //Score
    const score = {
        best: parseInt(localStorage.getItem("best")) || 0,
        value: 0,

        draw: function () {
            flappyCtx.fillStyle = "white"


            if (flappyGameState.current == flappyGameState.playing) {
                flappyCtx.lineWidth = 2;
                flappyCtx.font = "30px Arial"
                flappyCtx.fillText(this.value, flappyCanvas.width / 2, 50)

            }
            else if (flappyGameState.current == flappyGameState.over) {
                flappyCtx.font = "20px Arial"
                flappyCtx.fillText(this.value, 220, 170)


                flappyCtx.fillText(this.best, 220, 200)

            }
        },

        reset: function () {
            this.value = 0
        }
    }

    const restartBtn = {
        x: 120,
        y: 235,
        w: 83,
        h: 30,
    }


    function draw() {
        flappyCtx.fillStyle = "#70c5ce"
        flappyCtx.fillRect(0, 0, flappyCanvas.width, flappyCanvas.height)
        flappyBackground.draw()
        pipe.draw()
        flappyForeground.draw()
        spaceship.draw()
        readyMessage.draw()
        gameOverMessage.draw()
        score.draw()
       
    }

    function update() {
        spaceship.update()
        flappyForeground.update()
        pipe.update()
    }

    function loop() {
        update()
        draw()
        flappyFrames++
        requestAnimationFrame(loop)
    }
    loop()
    getUserInfo()
})
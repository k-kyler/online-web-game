$(document).ready(function () {

    const snakeCanvas = document.getElementById("snakeCanvas")
    const snakeCtx = snakeCanvas.getContext("2d")

    const box = 32

    const gameState = {
        current: 0,
        ready: 0,
        playing: 1,
        over: 2,
    }

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

    let game
    snakeCanvas.addEventListener("click", e => {
        switch (gameState.current) {
            case gameState.ready:
                if (stamina >= 10) {
                    stamina -= 10
                }
                else {
                    console.log("You don't have enough stamina")
                    break
                }
                
                gameState.current = gameState.playing
                game = setInterval(draw, 100)
                break
            case gameState.playing:

                break
            case gameState.over:

                gameState.current = gameState.ready
                drawReady()
                snake = []
                snake[0] = {
                    x: 9 * box,
                    y: 10 * box
                }
                score = 0
                direction = ""
                break
        }
    })

    let snake = []
    snake[0] = {
        x: 9 * box,
        y: 10 * box
    }

    let food = {
        x: Math.floor(Math.random() * 19) * box,
        y: Math.floor(Math.random() * 19) * box
    }

    let score = 0

    const ground = new Image()
    ground.src = "../assets/snake-ground.jpg"
    const star = new Image()
    star.src = "../assets/snake-star.png"
    const head = new Image()
    head.src = "../assets/snake-head.png"
    const body = new Image()
    body.src = "../assets/snake-body.png"

    function draw() {
        snakeCtx.drawImage(ground, 0, 0, 608, 608)
        for (let i = 0; i < snake.length; i++) {
            if (i == 0) {
                if (direction == "LEFT") {
                    snakeCtx.save()
                    rotateImage(head, snake[i].x, snake[i].y, box, box, 270)
                    snakeCtx.restore()
                }
                if (direction == "UP") {
                    snakeCtx.save()
                    rotateImage(head, snake[i].x, snake[i].y, box, box, 0)
                    snakeCtx.restore()
                }
                if (direction == "RIGHT") {
                    snakeCtx.save()
                    rotateImage(head, snake[i].x, snake[i].y, box, box, 90)
                    snakeCtx.restore()
                }
                if (direction == "DOWN") {
                    snakeCtx.save()
                    rotateImage(head, snake[i].x, snake[i].y, box, box, 180)
                    snakeCtx.restore()
                }
            }
            else {
                snakeCtx.save()
                rotateImageAround(body, snake[i].x, snake[i].y, box, box)
                snakeCtx.restore()
            }

        }

        snakeCtx.save()
        rotateImageAround(star, food.x, food.y, box, box)
        snakeCtx.restore()
        //ctx.drawImage(star, food.x, food.y, box, box)

        let snakeX = snake[0].x
        let snakeY = snake[0].y

        if (direction == "LEFT") {
            snakeX -= box
        }
        if (direction == "UP") {
            snakeY -= box
        }
        if (direction == "RIGHT") {
            snakeX += box
        }
        if (direction == "DOWN") {
            snakeY += box
        }

        if (snakeX == food.x && snakeY == food.y) {
            score++
            food = {
                x: Math.floor(Math.random() * 19) * box,
                y: Math.floor(Math.random() * 19) * box
            }
        }
        else {
            snake.pop()
        }

        if (snakeX < 0) {
            snakeX = 608 - 32
        }
        if (snakeX > 608 - 32) {
            snakeX = 0
        }
        if (snakeY < 0) {
            snakeY = 608 - 32
        }
        if (snakeY > 608 - 32) {
            snakeY = 0
        }

        let newHead = {
            x: snakeX,
            y: snakeY
        }

        if (collision(newHead, snake)) {
            gameState.current = gameState.over
            clearInterval(game)
            snakeCtx.fillStyle = "#70c5ce"
            snakeCtx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height)

            coin += score
            exp += (score * 2)
            level = Math.ceil(exp / 1000)

            setUserInfo()

            $('#playerLevel').html(level)
            $('#dp-stamina').html(stamina + "%")
            $('#dp-stamina-progress').css("width", stamina + "%")
            $('#dp-exp').html(Math.ceil((exp % 1000) * 100 / 1000) + "%")
            $('#dp-exp-progress').css("width", Math.ceil((exp % 1000) * 100 / 1000) + "%")
            $('#dp-coin').html("Coin: " + coin)

            snakeCtx.fillStyle = "white"
            snakeCtx.font = "50px Arial"
            snakeCtx.fillText("Score: " + score, 5 * box, 8 * box)

            if (localStorage.getItem("score") < score) {
                localStorage.setItem("score", score)
            }
            snakeCtx.fillStyle = "white"
            snakeCtx.font = "50px Arial"
            snakeCtx.fillText("Best Score: " + localStorage.getItem("bestScoreSnake"), 5 * box, 10 * box)
        }
        snake.unshift(newHead)

        snakeCtx.fillStyle = "white"
        snakeCtx.font = "30px Arial"
        snakeCtx.fillText("Score: " + score, 0.5 * box, 1 * box)
    }

    function collision(head, snake) {
        for (let i = 0; i < snake.length; i++) {
            if (head.x == snake[i].x && head.y == snake[i].y) {
                return true
            }
        }
        return false
    }

    let angle = 0
    function rotateImageAround(img, x, y, width, height) {
        snakeCtx.translate(x + width / 2, y + height / 2);
        snakeCtx.rotate(angle * Math.PI / 180);
        snakeCtx.translate(-(x + width / 2), -(y + height / 2));
        snakeCtx.drawImage(img, x, y, width, height)
        if (angle >= 360) {
            angle = 0;
        }
        angle = angle + 10;
    }
    function rotateImage(img, x, y, width, height, angle) {
        snakeCtx.translate(x + width / 2, y + height / 2);
        snakeCtx.rotate(angle * Math.PI / 180);
        snakeCtx.translate(-(x + width / 2), -(y + height / 2));
        snakeCtx.drawImage(img, x, y, width, height)
    }

    document.addEventListener("keydown", keyPress)
    let direction
    function keyPress(e) {
        if (e.keyCode === 37 && direction != "RIGHT") {
            direction = "LEFT"
        }
        else if (e.keyCode === 38 && direction != "DOWN") {
            direction = "UP"
        }
        else if (e.keyCode === 39 && direction != "LEFT") {
            direction = "RIGHT"
        }
        else if (e.keyCode === 40 && direction != "UP") {
            direction = "DOWN"
        }
    }

    function drawReady() {
        snakeCtx.fillStyle = "#70c5ce"
        snakeCtx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height)


        snakeCtx.fillStyle = "white"
        snakeCtx.font = "50px Arial"
        snakeCtx.fillText("Mouse click to continue", 1.2 * box, 8 * box)

        snakeCtx.fillStyle = "white"
        snakeCtx.font = "40px Arial"
        snakeCtx.fillText('Use "Arrows" to control the snake', 0.2 * box, 10 * box)

        getUserInfo()
    }

    drawReady()


})



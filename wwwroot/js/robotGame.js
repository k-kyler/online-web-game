$(document).ready(function () {
    const speed = 0.05
    const speedScaleIncrease = 0.00001

    const robotGame = document.getElementById("robotGameCanvas")
    const world = document.querySelector("[data-world]")
    const loseMessage = document.querySelector(".loseMessage-robot")
    const startMessage = document.querySelector(".startMessage-robot")
    const scoreRobot = document.getElementsByClassName("score-robot")

    let lastTime
    let bestScore = 0

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
            bestScore = res.bestScoreRobot
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

    async function setBestScore() {
        try {
            await fetch(`${DEV_URL}/userinfo/bestscore`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    UserInfoId: userInfoId,
                    BestScore: Math.floor(score.value),
                    Game: "robot"
                }),
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    robotGame.addEventListener("click", e => {
        switch (gameState.current) {
            case gameState.ready:
                if (stamina >= 10) {
                    stamina -= 10
                    startMessage.setAttribute('style', 'display: none')
                    startHandler()
                }
                else {
                    console.log("You don't have enough stamina")
                    break
                }

                gameState.current = gameState.playing
                break
            case gameState.playing:

                break
            case gameState.over:
                loseMessage.setAttribute('style', 'display: none')

                startMessage.setAttribute('style', 'display: flex')
                gameState.current = gameState.ready
                break
        }
    })

    const ground = {
        element: document.querySelectorAll("[data-ground]"),
        setup: function () {
            helper.setProp(this.element[0], "--left", 0)
            helper.setProp(this.element[1], "--left", 300)
        },
        update: function (delta, speedScale) {
            this.element.forEach(ground => {
                helper.incrementProp(ground, "--left", delta * speedScale * speed * -1)
                if (helper.getProp(ground, "--left") <= -300) {
                    helper.incrementProp(ground, "--left", 600)
                }
            })
        }
    }

    const score = {
        value: 0,
        element: document.querySelector("[data-score]"),
        update: function (delta) {
            this.value += delta * 0.01
            this.element.innerHTML = Math.floor(this.value)
        },
        reset: function () {
            score.value = 0
        }
    }

    const robot = {
        element: document.querySelector("[data-robot]"),
        jumpSpeed: 0.3,
        isJumping: false,
        gravity: 0.001,
        frame: 0,
        maxFrame: 2,
        frameTime: 100,
        currentFrameTime: 0,
        y: 0,
        setup: function () {
            helper.setProp(this.element, "--bottom", 0)
            document.removeEventListener("keydown", robot.jump)
            document.addEventListener("keydown", robot.jump)
        },
        update: function (delta, speedScale) {
            if (this.isJumping) {
                this.element.src = '../assets/robot-jump.png'
                helper.incrementProp(this.element, "--bottom", this.y * delta)
                if (helper.getProp(this.element, "--bottom") <= 0) {
                    helper.setProp(this.element, "--bottom", 0)
                    this.isJumping = false
                }
                this.y -= this.gravity * delta
            }
            else if (this.currentFrameTime >= this.frameTime) {
                this.frame = (this.frame + 1) % this.maxFrame
                this.element.src = '../assets/robot-run-' + this.frame + '.png'
                this.currentFrameTime -= this.frameTime
            }
            this.currentFrameTime += delta * speedScale

        },
        jump: function (e) {
            if (e.keyCode !== 32 || robot.isJumping) {
                return
            }
            robot.y = robot.jumpSpeed
            robot.isJumping = true
        },
        die: function () {
            this.element.src = '../assets/robot-die.png'
        },
        reset: function () {
            this.element.src = '../assets/robot-idle.png'
        }
    }

    const enemy = {
        spaceMin: 700,
        spaceMax: 2000,
        next: 0,
        setup: function () {
            this.next = this.spaceMin
            document.querySelectorAll("[data-enemy]").forEach(c => c.remove())
        },
        update: function (delta, speedScale) {
            document.querySelectorAll("[data-enemy]").forEach(c => {
                helper.incrementProp(c, "--left", delta * speedScale * speed * -1)
                if (helper.getProp(c, "--left") <= -100) {
                    c.remove()
                }
            })
            if (enemy.next <= 0) {
                enemy.create()
                enemy.next = Math.floor(Math.random() * (this.spaceMax - this.spaceMin + 1) + this.spaceMin) / speedScale
            }
            enemy.next -= delta
        },
        create: function () {
            const newEnemy = document.createElement("img")
            newEnemy.dataset.enemy = true
            newEnemy.src = "../assets/robot-enemy.png"
            newEnemy.classList.add("robot-enemy")
            helper.setProp(newEnemy, "--left", 100)
            world.append(newEnemy)
        },
        getRect: function () {
            return [...document.querySelectorAll("[data-enemy]")].map(c => {
                return c.getBoundingClientRect()
            })
        }
    }

    const helper = {
        getProp: function (element, prop) {
            return parseFloat(getComputedStyle(element).getPropertyValue(prop)) || 0
        },
        setProp: function (element, prop, value) {
            element.style.setProperty(prop, value)
        },
        incrementProp: function (element, prop, inc) {
            this.setProp(element, prop, this.getProp(element, prop) + inc)
        }
    }

    const speedScale = {
        value: 0,
        update: function (delta) {
            this.value += delta * speedScaleIncrease
        }
    }


    function update(time) {
        if (lastTime == null) {
            lastTime = time
            window.requestAnimationFrame(update)
            return
        }
        const delta = time - lastTime
        ground.update(delta, 1)
        score.update(delta)
        speedScale.update(delta)
        robot.update(delta, speedScale.value)
        enemy.update(delta, speedScale.value)
        if (checkLose()) {
            return loseHandler()
        }

        lastTime = time
        window.requestAnimationFrame(update)
    }


    function startHandler() {
       
        lastTime = null
        speedScale.value = 1
        ground.setup()
        robot.setup()
        enemy.setup()
        window.requestAnimationFrame(update)
    }

    function checkLose() {
        const robotRect = robot.element.getBoundingClientRect()
        return enemy.getRect().some(rect => isCollision(rect, robotRect))
    }

    function isCollision(rect1, rect2) {
        return (
            rect1.left < rect2.right &&
            rect1.top < rect2.bottom &&
            rect1.right > rect2.left &&
            rect1.bottom > rect2.top
        )
    }

    function restartGame() {
        coin += Math.ceil(Math.ceil(Math.floor(score.value) / 10) / 2)
        exp += Math.ceil(Math.floor(score.value) / 10)
        level = Math.ceil(exp / 1000)

        setUserInfo()

        $('#playerLevel').html(level)
        $('#dp-stamina').html(stamina + "%")
        $('#dp-stamina-progress').css("width", stamina + "%")
        $('#dp-exp').html(Math.ceil((exp % 1000) * 100 / 1000) + "%")
        $('#dp-exp-progress').css("width", Math.ceil((exp % 1000) * 100 / 1000) + "%")
        $('#dp-coin').html("Coin: " + coin)
    }

    function loseHandler() {
        gameState.current = gameState.over

        restartGame()

        if (Math.floor(score.value) > bestScore) {
            $('#dp-bestscore-robot').html(Math.floor(score.value))
            setBestScore()
            scoreRobot[0].innerHTML = "Score: " + Math.floor(score.value)
            scoreRobot[1].innerHTML = "Best Score: " + Math.floor(score.value)
        }
        else {
            scoreRobot[0].innerHTML = "Score: " + Math.floor(score.value)
            scoreRobot[1].innerHTML = "Best Score: " + bestScore
        }
        
        score.reset()
        robot.die()
        loseMessage.setAttribute("style", "display: flex")
        getUserInfo()
    }
})
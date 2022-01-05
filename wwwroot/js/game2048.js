$(document).ready(function () {
    const game2048 = document.getElementById('game2048Canvas')
    const loseMessage = document.querySelector('.loseMessage-2048')
    const startMessage = document.querySelector('.startMessage-2048')
    const gridDisplay = document.querySelector('.grid-2048')
    const scoreDisplay = document.getElementsByClassName('score-2048')
    const width = 4
    let squares = []
    let currentGrid = []
    let squareValues = []
    let checkLeft = false
    let checkRight = false
    let checkUp = false
    let checkDown = false
    let score = 0

    let userInfoId = ""
    let stamina = 0
    let level = 0
    let exp = 0
    let coin = 0
    let bestScore = 0
    async function getUserInfo() {
        try {
            const response = await fetch(`${DEV_URL}/userinfo`);
            const res = await response.json()


            userInfoId = res.infoId
            stamina = res.stamina
            level = res.level
            exp = res.exp
            coin = res.coin
            bestScore = res.bestScore2048
            console.log(bestScore)
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
                    BestScore: score,
                    Game: "2048"
                }),
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            let square = document.createElement('div')
            square.innerHTML = 0
            square.setAttribute('class', 'grid-2048-0')
            gridDisplay.appendChild(square)

            squares.push(square)
        }
        squareValues = squares.map(s => parseInt(s.innerHTML))
    }

    function generateNew2() {
        let randomNum = Math.floor(Math.random() * squares.length)
        if (!isEqual(currentGrid, squareValues)) {
            if (squares[randomNum].innerHTML == 0) {
                squares[randomNum].innerHTML = 2
                squares[randomNum].setAttribute('class', 'grid-2048-2')
                squareValues = squares.map(s => parseInt(s.innerHTML))
                score++
            }
            else generateNew2()
        }
    }

    function checkWipeLeft() {
        if (isEqual(currentGrid, squareValues)) {
            checkLeft = true
        }
        else {
            checkLeft = false
            checkRight = false
            checkUp = false
            checkDown = false
        }
    }
    function checkWipeRight() {
        if (isEqual(currentGrid, squareValues)) {
            checkRight = true
        }
        else {
            checkLeft = false
            checkRight = false
            checkUp = false
            checkDown = false
        }
    }
    function checkWipeUp() {
        if (isEqual(currentGrid, squareValues)) {
            checkUp = true
        }
        else {
            checkLeft = false
            checkRight = false
            checkUp = false
            checkDown = false
        }
    }
    function checkWipeDown() {
        if (isEqual(currentGrid, squareValues)) {
            checkDown = true
        }
        else {
            checkLeft = false
            checkRight = false
            checkUp = false
            checkDown = false
        }
    }

    function checkGameOver() {
        if (checkLeft && checkDown && checkRight && checkUp) {
            restartGame()

            document.removeEventListener('keyup', keyPress)

            loseMessage.setAttribute('style', 'display: flex')
            if (score > bestScore) {
                $('#dp-bestscore-2048').html(score)
                setBestScore()
                scoreDisplay[0].innerHTML = 'Score: ' + score
                scoreDisplay[1].innerHTML = 'Best Score: ' + score
            }
            else {
                scoreDisplay[0].innerHTML = 'Score: ' + score
                scoreDisplay[1].innerHTML = 'Best Score: ' + bestScore
            }
            gameState.current = gameState.over
        }
    }

    function removeAllChildNodes(p) {
        while (p.firstChild) {
            p.removeChild(p.firstChild);
        }
    }

    const gameState = {
        current: 0,
        ready: 0,
        playing: 1,
        over: 2,
    }

    function restartGame() {
        coin += Math.ceil(Math.ceil(score / 5) / 2)
        exp += Math.ceil(score / 5)
        level = Math.ceil(exp / 1000)

        setUserInfo()

        $('#playerLevel').html(level)
        $('#dp-stamina').html(stamina + "%")
        $('#dp-stamina-progress').css("width", stamina + "%")
        $('#dp-exp').html(Math.ceil((exp % 1000) * 100 / 1000) + "%")
        $('#dp-exp-progress').css("width", Math.ceil((exp % 1000) * 100 / 1000) + "%")
        $('#dp-coin').html("Coin: " + coin)
    }

    game2048.addEventListener("click", e => {
        switch (gameState.current) {
            case gameState.ready:
                if (stamina >= 10) {
                    stamina -= 10
                    startMessage.setAttribute('style', 'display: none')
                    createBoard()
                    generateNew2()
                    generateNew2()
                    document.addEventListener('keyup', keyPress)
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
                getUserInfo()
                loseMessage.setAttribute('style', 'display: none')
                removeAllChildNodes(gridDisplay)
                squares = []
                currentGrid = []
                squareValues = []
                checkLeft = false
                checkRight = false
                checkUp = false
                checkDown = false
                score = 0
                startMessage.setAttribute('style', 'display: flex')
                gameState.current = gameState.ready
                break
        }
    })

    function keyPress(e) {
        if (e.keyCode === 65) {
            currentGrid = squareValues.slice();
            wipeLeft()
            combineRow()
            wipeLeft()
            generateNew2()
            checkWipeLeft()
            changeColor()
            checkGameOver()
        }
        else if (e.keyCode === 87) {
            currentGrid = squareValues.slice();
            wipeUp()
            conbineCol()
            wipeUp()
            generateNew2()
            checkWipeUp()
            changeColor()
            checkGameOver()
        }
        else if (e.keyCode === 68) {
            currentGrid = squareValues.slice();
            wipeRight()
            combineRow()
            wipeRight()
            generateNew2()
            checkWipeRight()
            changeColor()
            checkGameOver()
        }
        else if (e.keyCode === 83) {
            currentGrid = squareValues.slice();
            wipeDown()
            conbineCol()
            wipeDown()
            generateNew2()
            checkWipeDown()
            changeColor()
            checkGameOver()
        }
    }
    function wipeUp() {
        for (let i = 0; i < 4; i++) {
            let square1 = squares[i].innerHTML
            let square2 = squares[i + width].innerHTML
            let square3 = squares[i + width * 2].innerHTML
            let square4 = squares[i + width * 3].innerHTML

            let col = [parseInt(square1), parseInt(square2), parseInt(square3), parseInt(square4)]
            let filteredCol = col.filter(num => num)
            let numOfZeroSquare = 4 - filteredCol.length
            let zeroSquare = Array(numOfZeroSquare).fill(0)
            let newCol = filteredCol.concat(zeroSquare)

            squares[i].innerHTML = newCol[0]
            squares[i + width].innerHTML = newCol[1]
            squares[i + width * 2].innerHTML = newCol[2]
            squares[i + width * 3].innerHTML = newCol[3]
        }
        squareValues = squares.map(s => parseInt(s.innerHTML))
    }

    function wipeDown() {
        for (let i = 0; i < 4; i++) {
            let square1 = squares[i].innerHTML
            let square2 = squares[i + width].innerHTML
            let square3 = squares[i + width * 2].innerHTML
            let square4 = squares[i + width * 3].innerHTML

            let col = [parseInt(square1), parseInt(square2), parseInt(square3), parseInt(square4)]
            let filteredCol = col.filter(num => num)
            let numOfZeroSquare = 4 - filteredCol.length
            let zeroSquare = Array(numOfZeroSquare).fill(0)
            let newCol = zeroSquare.concat(filteredCol)

            squares[i].innerHTML = newCol[0]
            squares[i + width].innerHTML = newCol[1]
            squares[i + width * 2].innerHTML = newCol[2]
            squares[i + width * 3].innerHTML = newCol[3]
        }
        squareValues = squares.map(s => parseInt(s.innerHTML))
    }

    function wipeLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let square1 = squares[i].innerHTML
                let square2 = squares[i + 1].innerHTML
                let square3 = squares[i + 2].innerHTML
                let square4 = squares[i + 3].innerHTML

                let row = [parseInt(square1), parseInt(square2), parseInt(square3), parseInt(square4)]
                let filteredRow = row.filter(num => num)
                let numOfZeroSquare = 4 - filteredRow.length
                let zeroSquare = Array(numOfZeroSquare).fill(0)
                let newRow = filteredRow.concat(zeroSquare)

                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
            }
        }
        squareValues = squares.map(s => parseInt(s.innerHTML))
    }

    function wipeRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let square1 = squares[i].innerHTML
                let square2 = squares[i + 1].innerHTML
                let square3 = squares[i + 2].innerHTML
                let square4 = squares[i + 3].innerHTML

                let row = [parseInt(square1), parseInt(square2), parseInt(square3), parseInt(square4)]
                let filteredRow = row.filter(num => num)
                let numOfZeroSquare = 4 - filteredRow.length
                let zeroSquare = Array(numOfZeroSquare).fill(0)
                let newRow = zeroSquare.concat(filteredRow)

                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
            }
        }
        squareValues = squares.map(s => parseInt(s.innerHTML))
    }

    function conbineCol() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML) {
                let combined = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML)
                squares[i].innerHTML = combined
                squares[i + width].innerHTML = 0
            }
        }
        squareValues = squares.map(s => parseInt(s.innerHTML))
    }
    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if ((i % 4 !== 3) && squares[i].innerHTML === squares[i + 1].innerHTML) {
                let combined = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML)
                squares[i].innerHTML = combined
                squares[i + 1].innerHTML = 0
            }
        }
        squareValues = squares.map(s => parseInt(s.innerHTML))
    }

    function changeColor() {
        for (let i = 0; i < 16; i++) {
            if (squares[i].innerHTML == 0) {
                squares[i].setAttribute('class', 'grid-2048-0')
            }
            else if (squares[i].innerHTML == 2) {
                squares[i].setAttribute('class', 'grid-2048-2')
            }
            else if (squares[i].innerHTML == 4) {
                squares[i].setAttribute('class', 'grid-2048-4')
            }
            else if (squares[i].innerHTML == 8) {
                squares[i].setAttribute('class', 'grid-2048-8')
            }
            else if (squares[i].innerHTML == 16) {
                squares[i].setAttribute('class', 'grid-2048-16')
            }
            else if (squares[i].innerHTML == 32) {
                squares[i].setAttribute('class', 'grid-2048-32')
            }
            else if (squares[i].innerHTML == 64) {
                squares[i].setAttribute('class', 'grid-2048-64')
            }
            else if (squares[i].innerHTML == 128) {
                squares[i].setAttribute('class', 'grid-2048-128')
            }
            else if (squares[i].innerHTML == 256) {
                squares[i].setAttribute('class', 'grid-2048-256')
            }
            else if (squares[i].innerHTML == 512) {
                squares[i].setAttribute('class', 'grid-2048-512')
            }
            else if (squares[i].innerHTML == 1024) {
                squares[i].setAttribute('class', 'grid-2048-1024')
            }
            else if (squares[i].innerHTML == 2048) {
                squares[i].setAttribute('class', 'grid-2048-2048')
            }
        }
    }

    function isEqual(a, b) {
        if (a.length != b.length)
            return false
        else {
            for (let i = 0; i < a.length; i++) {
                if (a[i] != b[i])
                    return false
            }
            return true
        }
    }

    function startGame() {
        createBoard()
        generateNew2()
        generateNew2()
    }

})
const addScoreBtns = document.querySelectorAll('.add-score-btn')

addScoreBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        if(btn.dataset.club === "home") {
            const scoreNum = Number(btn.textContent[1])
            const scoreEl = document.querySelector('.home')
            addScore(scoreNum, scoreEl, btn.dataset.club, btn)
        }
        else if(btn.dataset.club === "guest") {
            const scoreNum = Number(btn.textContent[1])
            const scoreEl = document.querySelector('.guest')
            addScore(scoreNum, scoreEl, btn.dataset.club, btn)
        }
    })
})

const score = {
    home: 0,
    guest: 0
}

let winStatus = ''

function addScore(scoreNum, scoreEl, clubName, btn) {
    score[clubName] += scoreNum
    renderScore(clubName)

    checkForWinner()
    
    // add focus state on button
    scoreEl.parentNode.querySelectorAll('.add-score-btns button').forEach(btn => btn.classList.remove('focus'))
    btn.classList.add('focus')
}

function renderScore(clubName) {
    document.querySelector('.'+clubName).textContent = score[clubName].toString().padStart(2, 0)
}

function checkForWinner() {
    if (score.home > score.guest) {
        document.querySelectorAll('.score').forEach(score => score.classList.remove('active', 'draw'))
        document.querySelector('.home').classList.add('active')
    }
    else if (score.guest > score.home) {
        document.querySelectorAll('.score').forEach(score => score.classList.remove('active', 'draw'))
        document.querySelector('.guest').classList.add('active')
    }
    else if(score.home === score.guest && (score.home !== 0 && score.guest !== 0)) {
        document.querySelectorAll('.score').forEach((score) => {
            score.classList.remove('active')
            score.classList.add('draw')
        })
    }
}

// reset score
document.querySelectorAll('.reset-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        score[e.target.dataset.resetScore] = 0
        btn.parentNode.querySelector('.score').classList.remove('active')
        btn.parentNode.querySelectorAll('.add-score-btns button').forEach(btn => btn.classList.remove('focus'))
        checkForWinner()
        renderScore(e.target.dataset.resetScore)
    })
})
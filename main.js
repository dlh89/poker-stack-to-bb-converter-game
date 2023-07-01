let score = 0;
let bb = 0;
let stack = 0;
let playerAnswer = '';

const possibleBbSizes = [
    100,
    200,
    300,
    400,
    600,
    800,
    200,
    600,
    2000,
    3000,
    4000,
    6000,
    8000,
    12000,
    16000,
    20000,
    30000,
    40000,
    50000,
]

document.querySelector('.js-answer-form').addEventListener('submit', handleAnswerSubmit)

function generateBB() {
    bb = possibleBbSizes[Math.floor(Math.random() * possibleBbSizes.length)]
    document.getElementById("bb").textContent = `Big Blind: ${bb.toLocaleString()}`;
}

function generateStack() {
    // Generate a random multiplier between 1 and 300
    let randomMultiplier = Math.floor(Math.random() * 300) + 1;

    // Ensure the stack size is at least equal to the big blind and no more than 300 times the big blind
    stack = bb * randomMultiplier;

    // If the stack exceeds 300 times the big blind, limit it to 300 times the big blind
    if (stack > bb * 300) {
        stack = bb * 300;
    }

    document.getElementById('stack').textContent = `Stack: ${stack.toLocaleString()}`;
}

function calculateBBs() {
    return stack / bb;
}

function handleAnswerSubmit(e) {
    e.preventDefault();
    playerAnswer = Number(document.getElementById('playerAnswer').value);
    correctAnswer = calculateBBs();
    let difference = Math.abs(playerAnswer - correctAnswer);

    if (difference / correctAnswer <= 0.1) { // Check if the difference is less than or equal to 10% of the correct answer
        score++;
        document.getElementById('result').textContent = `Your answer was correct!`;
        document.getElementById('result').className = 'font-weight-bold text-success';
    } else {
        score--;
        document.getElementById('result').textContent = `Your answer was incorrect.`;
        document.getElementById('result').className = 'font-weight-bold text-danger';
    }

    let percentageDifference = calculatePercentageDifference(playerAnswer, correctAnswer);
    document.getElementById('difference').textContent = `Your answer ${playerAnswer} was ${difference.toFixed(2)} BBs (${percentageDifference}%) off. The correct answer was ${correctAnswer.toFixed(2)} BBs.`;

    document.getElementById('result').style.display = 'inline';
    document.getElementById('score').textContent = "Score: " + score;
    document.getElementById('submit').style.display = "none";
    document.getElementById('continue').style.display = 'inline';
    document.querySelector('.js-answer-input').value = '';
    document.querySelector('.js-answer-input').disabled = true;
}

function continueGame() {
    generateBB();
    generateStack();
    document.getElementById('playerAnswer').value = '';
    document.getElementById('submit').style.display = 'inline';
    document.getElementById('continue').style.display = 'none';
    document.getElementById('result').style.display = 'none';
    document.querySelector('.js-answer-input').disabled = false;
    document.querySelector('.js-answer-input').focus();
    document.getElementById("difference").textContent = '';
}

function calculatePercentageDifference(x1, x2) {
    let difference = x1 - x2;
    let average = (x1 + x2) / 2;
    let percentageDifference = (difference / average) * 100;
    return Math.round(percentageDifference);
  }  

// Initial setup
generateBB();
generateStack();
document.getElementById('continue').style.display = 'none';

var startBtn = document.querySelector('#start-quiz'); 
var timeContainerEl = document.querySelector('.time-container');
var timeEl = document.querySelector('#time');
var titlePage = document.querySelector('.title-page');
var displayQuestion = document.querySelector('#display-question');
var questionsContainer = document.querySelector('.questions-container');
var formEl = document.querySelector('.form-card');
var rightWrong = document.querySelector('#right-wrong');
var highscoreBtn = document.querySelector('.scoreBtn-container');
var sumbitBtn = document.querySelector('#submit');
var scoreCard = document.querySelector('.score-card');
var viewScore = document.querySelector('#highScore');
var backBtn = document.querySelector('#backBtn');
var secondsLeft = 40;
var scoreEl = document.querySelector('#score');
var msgDiv = document.querySelector('#msg');
var userScore = document.querySelector('#user-score')
var clearBtn = document.querySelector('#clearBtn')
var score = 0;
var quizEnd = false;
let timeInt
var qIndex = 0
var questionList = [
    {
        question: "Which built-in method calls a function for each element in the array?",
        answeropt: ["A - while()", "B - loop()", "C - forEach()", "D - None of the above."],
        answer: "B - loop()"
      },
    {
        question: "How can you get the total number of arguments passed to a function?",
        answeropt: ["A - Using args.length property", "B - Using arguments.length property", "C - Both of the above.", "D - None of the above."],
        answer: "A - Using args.length property"
      },
    {
        question: "Which of the following function of String object returns the index within the calling String object of the first occurrence of the specified value?",
        answeropt: ["A - substr()", "B - search()", "C - lastIndexOf()", "D - indexOf()"],
        answer: "C - lastIndexOf()"
      },
    
    
];

var choices = [
    "#answer1","#answer2","#answer3","#answer4"
]

var choiceBtn = document.querySelectorAll('.answer');
var answerContainer = document.querySelector('.answerBtn-container');

// displays Title page when back button is clickec
function title() {
    titlePage.classList.remove('hide');
    highscoreBtn.classList.remove('hide');
    startBtn.classList.remove('hide');
    scoreCard.classList.add('hide');
    secondsLeft = 40; // reset timer
    score = 0; // reset score
    qIndex = 0; // resets pointer 
}

// removes attributes and elements from title page and starts timer and questions
function startQuiz() {
    timeContainerEl.classList.remove('hide');
    titlePage.classList.add('hide');
    questionsContainer.classList.remove('hide');
    highscoreBtn.classList.add('hide');
    startBtn.classList.add('hide');

    startTimer()
    displayFunction()
}

// countdown timer
function startTimer() {
    timeInt = setInterval(function(){
        secondsLeft--
        timeEl.textContent = secondsLeft
        if (secondsLeft <= 0) {
            clearInterval(timeInt) // quiz end; show high score.
            displayForm()
        }
    },1000)
}

// displays question based on the pointer qIndex
function displayFunction() {
    var currentQuestion = questionList[qIndex];
    displayQuestion.textContent = currentQuestion.question;
    var answers = currentQuestion.answeropt;
    for (let i = 0; i < answers.length; i++) {
        let answerBtns = document.querySelectorAll(`${choices[i]}`)
        for (let j = 0; j < answerBtns.length; j++) {
            answerBtns[j].textContent = answers[i]
        }
    }
}

// checks if chosen answer is correct and then change question
//display on screen whether the chosen answer is right or wrong
function showAnswer(event) {
    if (event.target.className === 'answer' && event.target.textContent === questionList[qIndex].answer) {
        console.log("correct answer");
        score +=10; //adds 10 points for every correct answer
        rightWrong.textContent = "Correct!";
        console.log(qIndex);
        console.log(score);
    } else {
        console.log('wrong answer');
        rightWrong.textContent = "Wrong!";
        secondsLeft -=10; // subracts time when answer is incorrect
        console.log(qIndex);
    };

    // when final question is displayed prevent qIndex from incrementing; stop increments when qIndex = 2
    if (qIndex < 2) {
        qIndex++; // increments the pointer to reference the next question
        displayFunction(); // recalls function to display next question
    } else {
        displayForm()
        clearInterval(timeInt)
    }
}

// create function that displays form to save score
function displayForm() {
    formEl.classList.remove('hide');
    questionsContainer.classList.add('hide');
    timeContainerEl.classList.add('hide');
    scoreEl.textContent = score;
}

// displays the saved scores 
function displayScore() {
    formEl.classList.add('hide');
    scoreCard.classList.remove('hide');
    titlePage.classList.add('hide');
    highscoreBtn.classList.add('hide');
    startBtn.classList.add('hide');

    var initials = localStorage.getItem("initials");
    var scores = localStorage.getItem('score');

    if (!initials || !scores) {
        return;
    }

    userScore.textContent = initials +" " + scores
}

function displayMessage(type, message) {
    msgDiv.textContent = message;
    msgDiv.setAttribute("class",type);
}



sumbitBtn.addEventListener('click', function(event) {
    event.preventDefault();

    var initials = document.querySelector("#initials").value;

    if (initials === "") {
        displayMessage("error","To save score, initials must not be blank")
    } else {
        localStorage.setItem("initials", initials)
        localStorage.setItem('score', score)
        displayScore();
    }
})

startBtn.addEventListener('click', startQuiz)

answerContainer.addEventListener('click', showAnswer)

viewScore.addEventListener('click', displayScore)

backBtn.addEventListener('click', title)

clearBtn.addEventListener('click', function() {
    localStorage.clear();
    userScore.textContent = "Nothing here!"
    displayScore();
})
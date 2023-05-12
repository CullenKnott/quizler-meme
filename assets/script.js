var startBtn = document.querySelector('#start-quiz'); 
var timeContainerEl = document.querySelector('.time-container');
var timeEl = document.querySelector('#time');
var titlePage = document.querySelector('.title-page');
var displayQuestion = document.querySelector('#display-question')
var questionsContainer = document.querySelector('.questions-container')
var secondsLeft = 100;
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

function startQuiz() {
    timeContainerEl.classList.remove('hide');
    titlePage.classList.add('hide');
    questionsContainer.classList.remove('hide');
    startTimer()
    displayFunction()
}

function startTimer() {
    timeInt = setInterval(function(){
        secondsLeft--
        timeEl.textContent = secondsLeft
        if (secondsLeft <= 0) {
            clearInterval(timeInt) // quiz end; show high score.
        }
    },1000)
}

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

function showAnswer(event) {
    if (event.target.className === 'answer' && event.target.textContent === questionList[qIndex].answer) {
        console.log("correct answer")
    } else {
        console.log('wrong answer')
    }
    //var currentQuestion = questionList[qIndex];
   // for (var correctAnswer of choices) {
      //  if (correctAnswer.match(currentQuestion.answer)) {
       //     console.log('correct answer')
       // }
  //  }

}

// add event listener; use .matches element -  element.matches('button') to check text.content
//choiceBtn.addEventListener('click', showAnswer)


startBtn.addEventListener('click', startQuiz)

answerContainer.addEventListener('click', showAnswer)
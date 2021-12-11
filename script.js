/**
 * Quiz class
 */

class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
  }

  getQuestionIndex() {
    return this.questions[this.questionIndex];
  }

  guess(answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.questionIndex++;
  }

  isEnded() {
    return this.questionIndex === this.questions.length;
  }
}

/**
 *  Questions class
 */

class Questions {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }

  isCorrectAnswer(choice) {
    return this.answer === choice;
  }
}

/**
 * Display the questions
 */

function displayQuestions() {
  if (quiz.isEnded()) {
    showScores();
  } else {
    let quizElement = document.getElementById('question');
    quizElement.innerHTML = quiz.getQuestionIndex().text;

    let choices = quiz.getQuestionIndex().choices;

    for (let q = 0; q < choices.length; q++) {
      let choiceElement = document.getElementById('option' + q);
      choiceElement.innerHTML = choices[q];
      guess('btn' + q, choices[q]);
    }

    showProgress();
  }
}

/**
 * show current question
 */

function showProgress() {
  let currentQuestionNumber = quiz.questionIndex + 1;
  let progesselement = document.getElementById('progress');
  progesselement.innerHTML = `Question ${currentQuestionNumber} 0f ${quiz.questions.length}`;
}

/**
 * Guess the answer
 */

function guess(id, guessAnswer) {
  let button = document.getElementById(id);
  button.onclick = function () {
    quiz.guess(guessAnswer);
    displayQuestions();
  };
}

/**
 * show Scores
 */

function showScores() {
  let endQuiz = `
     <h1>Quiz completed</h1>
     <h2 id='score'> Your Score : ${quiz.score} of ${quiz.questions.length}</h2>
    <div class="try-again">
      <a href="index.html">Take Quiz Again</a>
    </div>    
     `;

  let quizElement = document.getElementById('quiz');
  quizElement.innerHTML = endQuiz;
}

/**
 * Questions
 */
let questionsArray = [
  new Questions(
    'Who creted JavaScript ?',
    ['Steve Jobs', 'Bill Gates', 'Linus Torvalds', 'Brendan Eich'],
    'brendon eich'
  ),
  new Questions(
    'Inside which HTML element do we put the JavaScript?',
    ['Script', 'Paragraph', 'Link', 'Style'],
    'script'
  ),
  new Questions(
    'Hyper Text Markup Language Stands For?',
    ['JQuery', 'XHTML', 'CSS', 'HTML'],
    'HTML'
  ),
  new Questions(
    'Cascading Style sheet stands for?',
    ['HTML', 'JQuery', 'CSS', 'XML'],
    'CSS'
  ),
  new Questions(
    'Which is a JavaScript Framework?',
    ['React', 'Laravel', 'Django', 'Sass'],
    'React'
  ),
  new Questions(
    'Which is a backend language?',
    ['PHP', 'HTML', 'React', 'All'],
    'PHP'
  ),
  new Questions(
    'Which is best for Artificial intelligence?',
    ['React', 'Laravel', 'Python', 'Sass'],
    'Python'
  ),
];

/**
 * Initilaize quiz
 */

let quiz = new Quiz(questionsArray);

displayQuestions();

/**
 * timer
 */

let time = 1;
let quizTimeInMinutes = time * 60 * 60;
let quizTime = quizTimeInMinutes / 60;

let count = document.getElementById('count-down');

function startCountDown() {
  let quizTimer = setInterval(function () {
    if (quizTime <= 0) {
      clearInterval(quizTimer);
      showScores();
    } else {
      quizTime--;
      let sec = Math.floor(quizTime % 60);
      let min = Math.floor(quizTime / 60) % 60;
      count.innerHTML = `Time: ${min}:${sec}`;
    }
  }, 1000);
}

startCountDown();

document.addEventListener("DOMContentLoaded", function () {
  // Quiz class encapsulates quiz-related functionality
  class Quiz {
    // Constructor initializes DOM elements and sets up event listeners
    constructor() {
      this.questionContainer = document.getElementById("question-container");
      this.questionElement = document.getElementById("question");
      this.answerButtons = document.getElementById("answer-buttons");
      this.nextButton = document.getElementById("next-btn");
      this.restartButton = document.getElementById("restart-btn");
      this.resultDiv = document.getElementById("result");

      this.shuffledQuestions = [];
      this.currentQuestionIndex = 0;
      this.score = 0;

      // Event listeners are set up in the constructor
      this.nextButton.addEventListener("click", () => this.nextQuestion());
      this.restartButton.addEventListener("click", () => this.startQuiz());
    }

    // Method to start the quiz
    startQuiz() {
      this.score = 0;
      this.questionContainer.style.display = "block";
      this.shuffledQuestions = this.shuffle(quizQuestions);
      this.currentQuestionIndex = 0;
      this.nextButton.classList.remove("hide");
      this.restartButton.classList.add("hide");
      this.resultDiv.classList.add("hide");
      this.setNextQuestion();
    }

    // Method to set up the next question
    setNextQuestion() {
      this.resetState();
      this.showQuestion(this.shuffledQuestions[this.currentQuestionIndex]);
    }

    // Method to display a question
    showQuestion(question) {
      this.questionElement.innerText = question.question;
      question.options.forEach((option) => {
        const button = document.createElement("button");
        button.classList.add("btn");
        button.textContent = option.text;
        button.addEventListener("click", () => this.selectAnswer(option));
        this.answerButtons.appendChild(button);
      });
    }

    // Method to reset the state between questions
    resetState() {
      while (this.answerButtons.firstChild) {
        this.answerButtons.removeChild(this.answerButtons.firstChild);
      }
      this.nextButton.classList.add("hide");
      this.resultDiv.classList.add("hide");
      this.answerButtons.classList.remove("disable-click");
    }

    // Method to handle the selection of an answer
    selectAnswer(selectedOption) {
      const question = this.shuffledQuestions[this.currentQuestionIndex];
      const correct = selectedOption.correct;

      if (correct) {
        this.score++;
      }

      this.answerButtons.classList.add("disable-click");
      this.showCorrectAnswer(question, selectedOption);

      this.currentQuestionIndex++;
      if (this.currentQuestionIndex < this.shuffledQuestions.length) {
        setTimeout(() => this.setNextQuestion(), 2000);
      } else {
        setTimeout(() => this.endQuiz(), 2000);
      }
    }

    // Method to show the correct answer and update the result
    showCorrectAnswer(question, selectedOption) {
      const correctIndex = question.options.findIndex(
        (option) => option.correct
      );
      this.answerButtons.children[correctIndex].classList.add("correct");

      if (selectedOption.correct) {
        this.resultDiv.innerText = "Correct!";
        this.resultDiv.classList.add("correct");
      } else {
        this.resultDiv.innerText = "Incorrect!";
        this.resultDiv.classList.add("incorrect");
      }

      this.resultDiv.classList.remove("hide");
      this.restartButton.classList.add("hide");
      this.nextButton.classList.add("hide");
    }

    // Method to end the quiz
    endQuiz() {
      this.questionContainer.style.display = "none";
      this.resultDiv.classList.remove("hide");
      this.resultDiv.innerText = `Your final score: ${this.score} / ${this.shuffledQuestions.length}`;
      this.restartButton.classList.remove("hide");
    // call to confetii function 
      Draw();
    }

    // Method to shuffle an array (used for randomizing questions)
    shuffle(array) {
      return array.sort(() => Math.random() - 0.5);
    }

    // Method called when the next button is clicked to reset the state
    nextQuestion() {
      this.answerButtons.classList.remove("disable-click");
      this.resultDiv.classList.add("hide");
    }
  }

  // Create an instance of the Quiz class
  const quiz = new Quiz();

  // Start the quiz when the DOM is loaded
  quiz.startQuiz();
   
//confetti code
let W = window.innerWidth;
let H = document.getElementById('confetti').clientHeight;
const canvas = document.getElementById('confetti');
const context = canvas.getContext("2d");
const maxConfettis = 25;
const particles = [];

const possibleColors = [
  "#ff7336",
  "#f9e038",
  "#02cca4",
  "#383082",
  "#fed3f5",
  "#b1245a",
  "#f2733f"
];

function randomFromTo(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}

function confettiParticle() {
  this.x = Math.random() * W; // x
  this.y = Math.random() * H - H; // y
  this.r = randomFromTo(11, 33); // radius
  this.d = Math.random() * maxConfettis + 11;
  this.color =
    possibleColors[Math.floor(Math.random() * possibleColors.length)];
  this.tilt = Math.floor(Math.random() * 33) - 11;
  this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
  this.tiltAngle = 0;

  this.draw = function() {
    context.beginPath();
    context.lineWidth = this.r / 2;
    context.strokeStyle = this.color;
    context.moveTo(this.x + this.tilt + this.r / 3, this.y);
    context.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
    return context.stroke();
  };
}

function Draw() {
  const results = [];

  // Magical recursive functional love
  requestAnimationFrame(Draw);

  context.clearRect(0, 0, W, window.innerHeight);

  for (var i = 0; i < maxConfettis; i++) {
    results.push(particles[i].draw());
  }

  let particle = {};
  let remainingFlakes = 0;
  for (var i = 0; i < maxConfettis; i++) {
    particle = particles[i];

    particle.tiltAngle += particle.tiltAngleIncremental;
    particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
    particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

    if (particle.y <= H) remainingFlakes++;

    // If a confetti has fluttered out of view,
    // bring it back to above the viewport and let if re-fall.
    if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
      particle.x = Math.random() * W;
      particle.y = -30;
      particle.tilt = Math.floor(Math.random() * 10) - 20;
    }
  }

  return results;
}


//confetti canvas
canvas.width = W;
canvas.height = H;

window.addEventListener(
  "resize",
  function() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  },
  false
);

// Push new confetti objects to `particles[]`
for (var i = 0; i < maxConfettis; i++) {
  particles.push(new confettiParticle());
}
});

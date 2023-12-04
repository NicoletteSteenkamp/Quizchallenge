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
});

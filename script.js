

document.addEventListener("DOMContentLoaded", function () {
  const questionContainer = document.getElementById("question-container");
  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  const restartButton = document.getElementById("restart-btn");
  const resultDiv = document.getElementById("result");

  let shuffledQuestions, currentQuestionIndex, score;

  startQuiz();

  function startQuiz() {
    score = 0;
    questionContainer.style.display = "block";
    shuffledQuestions = shuffle(quizQuestions);
    currentQuestionIndex = 0;
    nextButton.classList.remove("hide");
    restartButton.classList.add("hide");
    resultDiv.classList.add("hide");
    setNextQuestion();
  }

  function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  }

  function showQuestion(question) {
    questionElement.innerText = question.question;
    question.options.forEach((option) => {
      const button = document.createElement("button");
      button.classList.add("btn");
      button.textContent = option.text;
      button.addEventListener("click", () => selectAnswer(option));
      answerButtons.appendChild(button);
    });
  }

  function resetState() {
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
    nextButton.classList.add("hide");
    resultDiv.classList.add("hide");
    answerButtons.classList.remove("disable-click");
  }

  function selectAnswer(selectedOption) {
    const question = shuffledQuestions[currentQuestionIndex];
    const correct = selectedOption.correct;

    if (correct) {
      score++;
    }

    answerButtons.classList.add("disable-click");
    showCorrectAnswer(question, selectedOption);

    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
      setTimeout(setNextQuestion, 2000);
    } else {
      setTimeout(endQuiz, 2000);
    }
  }

  function showCorrectAnswer(question, selectedOption) {
    const correctIndex = question.options.findIndex((option) => option.correct);
    answerButtons.children[correctIndex].classList.add("correct");

    if (selectedOption.correct) {
      resultDiv.innerText = "Correct!";
      resultDiv.classList.add("correct");
    } else {
      resultDiv.innerText = "Incorrect!";
      resultDiv.classList.add("incorrect");
    }

    resultDiv.classList.remove("hide");
    restartButton.classList.add("hide");
    nextButton.classList.add("hide");
  }

  function endQuiz() {
    questionContainer.style.display = "none";
    resultDiv.classList.remove("hide");
    resultDiv.innerText = `Your final score: ${score} / ${shuffledQuestions.length}`;
    restartButton.classList.remove("hide");
  }

  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  nextButton.addEventListener("click", () => {
    answerButtons.classList.remove("disable-click");
    resultDiv.classList.add("hide");
  });

  restartButton.addEventListener("click", startQuiz);
});

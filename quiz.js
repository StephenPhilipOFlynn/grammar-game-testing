let currentQuestionIndex = 0;
let score = 0;
let questions = [];

async function loadQuestions() {
  try {
    const response = await fetch('data/questions.json');
    const data = await response.json();
    questions = data.questions;
    showQuestion();
  } catch (error) {
    document.getElementById('quiz-container').innerText = "Failed to load questions.";
  }
}

function updateScoreDisplay() {
  const scoreDisplay = document.getElementById('score-display');
  scoreDisplay.innerText = `Score: ${score}`;
}

function showQuestion() {
  const container = document.getElementById('quiz-container');
  container.innerHTML = '';

  if (currentQuestionIndex >= questions.length) {
    container.innerHTML = `<h2>Your score: ${score}/${questions.length}</h2>`;
    return;
  }

  const question = questions[currentQuestionIndex];

  const questionElem = document.createElement('h3');
  questionElem.innerText = question.question;
  container.appendChild(questionElem);

  question.options.forEach(option => {
    const button = document.createElement('button');
    button.innerText = option;
    button.classList.add('option-button');
    button.onclick = () => handleAnswer(option);
    container.appendChild(button);
  });
}

function handleAnswer(selected) {
  const correct = questions[currentQuestionIndex].answer;
  const feedback = document.getElementById('feedback-message');

  if (selected === correct) {
    score++;
    updateScoreDisplay();
    feedback.innerText = "✅ Correct!";
    feedback.style.opacity = 1;
  } else {
    feedback.innerText = "";
  }

  setTimeout(() => {
    feedback.style.opacity = 0;
    currentQuestionIndex++;
    showQuestion();
  }, 1000);
}

window.onload = loadQuestions;

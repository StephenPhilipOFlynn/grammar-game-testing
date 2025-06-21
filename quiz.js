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
  if (selected === correct) {
    score++;
  }
  currentQuestionIndex++;
  showQuestion();
}

window.onload = loadQuestions;

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

async function loadQuestions() {
  try {
    const response = await fetch('data/questions.json');
    const data = await response.json();
    questions = data.questions;
    shuffleArray(questions);
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
  const optionButtons = document.querySelectorAll('.option-button');

  optionButtons.forEach(button => {
    button.disabled = true; // Disable all options
    if (button.innerText === correct) {
      button.classList.add('correct');
    }
    if (button.innerText === selected && selected !== correct) {
      button.classList.add('incorrect');
    }
  });

  if (selected === correct) {
    score++;
    updateScoreDisplay();
    feedback.innerText = "✅ Correct!";
  } else {
    feedback.innerText = "❌ Incorrect!";
  }

  feedback.style.opacity = 1;

  setTimeout(() => {
    feedback.style.opacity = 0;
    currentQuestionIndex++;
    showQuestion();
  }, 1000);
}

window.onload = loadQuestions;

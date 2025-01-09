let currentQuestionIndex = 0, score = 0, timer;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const submitButton = document.getElementById("submit-button");
const progressIndicator = document.getElementById("progress-indicator");
const timerDisplay = document.getElementById("time-left");
const resultDisplay = document.getElementById("result");

const questions = [
     {
          question: "HTML stands for :",
          options:
               [
                    "HighText Machine Language",
                    "HyperText and links Markup Language",
                    "HyperText Markup Language",
                    "None of these"
               ],
          answer: "HyperText Markup Language",
     },
     {
          question: "The correct sequence of HTML tags for starting a webpage is -",
          options:
               [
                    "Head, Title, HTML, body",
                    "HTML, Body, Title, Head",
                    "HTML, Head, Body, Title",
                    "HTML, Head, Title, Body"
               ],
          answer: "HTML, Head, Title, Body",
     },
     {
          question: "Which element is responsible for making the text bold in HTML?",
          options:
               ["<pre>", "<a>", "<b>", "<br>"],
          answer: "<b>",
     },
     {
          question: "Which tag is used for inserting the largest heading in HTML?",
          options:
               ["<h3>", "<h1>", "<h5>", "<h6>"],
          answer: "<h1>",
     },
     {
          question: "Which tag is used to insert a line-break in HTML?",
          options:
               ["<br>", "<a>", "<pre>", "<b>"],
          answer: "<br>",
     },
];

function loadQuestion() {
     clearTimeout(timer);
     const currentQuestion = questions[currentQuestionIndex];
     questionText.textContent = currentQuestion.question;
     progressIndicator.textContent = `Question ${currentQuestionIndex + 1}/${questions.length}`;

     optionsContainer.innerHTML = "";
     currentQuestion.options.forEach((option) => {
          const button = document.createElement("button");
          button.textContent = option;
          button.classList.add("option");
          button.onclick = () => handleOptionSelect(button, currentQuestion.answer);
          optionsContainer.appendChild(button);
     });

     startTimer();
}

function handleOptionSelect(button, correctAnswer) {
     const selectedAnswer = button.textContent;
     if (selectedAnswer === correctAnswer) {
          button.style.backgroundColor = "#5AAB61";
          score++;
     } else {
          button.style.backgroundColor = "#FFADAD";
     }
     disableOptions();
}

function disableOptions() {
     const options = document.querySelectorAll(".option");
     options.forEach((option) => {
          option.disabled = true;
     });
}

function startTimer() {
     let timeLeft = 15;
     timerDisplay.textContent = timeLeft;

     timer = setInterval(() => {
          timeLeft--;
          timerDisplay.textContent = timeLeft;
          if (timeLeft === 0) {
               clearInterval(timer);
               disableOptions();
          }
     }, 1000);
}

submitButton.onclick = () => {
     if (currentQuestionIndex < questions.length - 1) {
          currentQuestionIndex++;
          loadQuestion();
     } else {
          showFinalResult();
     }
};

function showFinalResult() {
     questionText.innerHTML = "<b>Quiz Completed!</b>";
     optionsContainer.innerHTML = "";
     submitButton.style.display = "none";
     timerDisplay.style.display = "none";
     resultDisplay.textContent = `Your Score: ${score}/${questions.length}`;
}

loadQuestion();
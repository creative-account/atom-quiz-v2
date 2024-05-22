import { elements_list } from "./data.js";
import { clearMainScreen } from "./functions.js";
import { isSameMode } from "./mode_select.js";

const startButton = document.getElementById("start");
const mainScreen = document.getElementById("main_screen");
let currentQuizIndex = 0;
let difficultyLevel = 0;
let fromAttribute = 0;
let toAttribute = 0;
let quizzes = [];
let userAnswers = [];
let answerButtonIndices = [];
let correctButtonIndices = [];
let correctness = [];

function getMode() {
  difficultyLevel = document.getElementById("level").value;
  fromAttribute = document.getElementById("from").value;
  toAttribute = document.getElementById("to").value;
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = getRandomInteger(0, i);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createQuizFrame() {
  const quizDiv = document.createElement("div");
  quizDiv.className = "box is-size-3 has-text-centered";
  quizDiv.id = "quizFrame";

  const optionIds = ["option1", "option2", "option3"];
  const columnsDiv = document.createElement("div");
  columnsDiv.className = "columns";
  columnsDiv.id = "optionButtons";

  optionIds.forEach((id, index) => {
    const column = document.createElement("div");
    column.className = "column";

    const button = document.createElement("button");
    button.className = "button is-primary is-fullwidth is-medium option";
    button.id = id;
    button.addEventListener("click", () => handleAnswer(index, button.value));

    column.appendChild(button);
    columnsDiv.appendChild(column);
  });

  mainScreen.appendChild(quizDiv);
  mainScreen.appendChild(document.createElement("br"));
  mainScreen.appendChild(document.createElement("br"));
  mainScreen.appendChild(columnsDiv);
}

function generateQuiz() {
  let options;
  let quiz;

  do {
    options = [];
    while (options.length < 3) {
      const option = getRandomInteger(0, difficultyLevel);
      if (!options.includes(option)) {
        options.push(option);
      }
    }
    options = shuffleArray(options);
    quiz = options[getRandomInteger(0, 2)];
  } while (quizzes.includes(quiz));

  quizzes.push(quiz);
  correctButtonIndices.push(options.indexOf(quiz));

  return options;
}

function getPreText() {
  switch (fromAttribute) {
    case 0:
      return "原子番号 ";
    case 1:
      return "元素記号 ";
    case 2:
      return "元素名 ";
    default:
      return "";
  }
}

function displayQuiz() {
  const quizFrame = document.getElementById("quizFrame");
  const options = generateQuiz();
  const quiz = quizzes[currentQuizIndex];
  const preText = getPreText();

  quizFrame.textContent = preText + elements_list[quiz][fromAttribute];

  const buttons = document.getElementsByClassName('option');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].textContent = elements_list[options[i]][toAttribute];
    buttons[i].value = options[i];
  }
}

function handleAnswer(buttonIndex, buttonValue) {
  answerButtonIndices.push(buttonIndex);
  userAnswers.push(buttonValue);

  if (answerButtonIndices.length < 20) {
    currentQuizIndex++;
    displayQuiz();
  } else {
    compareAnswers();
    console.log("end");
  }
}

function compareAnswers() {
  correctness = quizzes.map((quiz, index) => userAnswers[index] == quiz ? "正解" : "不正解");
  clearMainScreen();
  displayScore();
}

function countCorrectAnswers() {
  return correctness.filter(result => result === "正解").length;
}

function displayScore() {
  const correctCount = countCorrectAnswers();
  const wrongCount = correctness.length - correctCount;

  const scoreDiv = document.createElement('div');
  scoreDiv.classList.add('box');
  const columnsDiv = document.createElement('div');
  columnsDiv.classList.add('columns');

  const correctColumn = document.createElement('div');
  correctColumn.classList.add('column');

  const checkSpan = document.createElement('span');
  checkSpan.classList.add('material-symbols-outlined', 'correct', 'has-text-success', 'mr-4', 'big-icon');
  checkSpan.textContent = 'check';
  const correctSpan = document.createElement('span');
  correctSpan.classList.add('is-size-3');
  correctSpan.id = 'correct';
  correctSpan.textContent = correctCount;
  correctColumn.append(checkSpan, correctSpan);

  const wrongColumn = document.createElement('div');
  wrongColumn.classList.add('column');
  const closeSpan = document.createElement('span');
  closeSpan.classList.add('material-symbols-outlined', 'has-text-danger', 'mr-4', 'big-icon');
  closeSpan.textContent = 'close';
  const wrongSpan = document.createElement('span');
  wrongSpan.classList.add('is-size-3');
  wrongSpan.id = 'wrong';
  wrongSpan.textContent = wrongCount;
  wrongColumn.append(closeSpan, wrongSpan);

  columnsDiv.append(correctColumn, wrongColumn);
  scoreDiv.appendChild(columnsDiv);
  mainScreen.appendChild(scoreDiv);

  displayAnswerTable();
}

function displayAnswerTable() {
  const tableDiv = document.createElement('div');
  tableDiv.classList.add('box');

  const table = document.createElement('table');
  table.classList.add('table', 'is-fullwidth', 'is-striped');

  const thead = document.createElement('thead');
  const theadRow = document.createElement('tr');
  ['問題', '正誤', '正解', 'あなたの解答'].forEach(text => {
    const th = document.createElement('th');
    th.textContent = text;
    theadRow.appendChild(th);
  });
  thead.appendChild(theadRow);

  const tbody = document.createElement('tbody');
  for (let i = 0; i < 20; i++) {
    const row = document.createElement('tr');
    const tdQuestion = document.createElement('td');
    tdQuestion.textContent = elements_list[quizzes[i]][fromAttribute];
    const tdResult = document.createElement('td');
    tdResult.textContent = correctness[i];
    tdResult.classList.add(correctness[i] === "正解" ? 'has-text-success' : 'has-text-danger');
    const tdCorrect = document.createElement('td');
    tdCorrect.textContent = elements_list[quizzes[i]][toAttribute];
    const tdAnswer = document.createElement('td');
    tdAnswer.textContent = elements_list[userAnswers[i]][toAttribute];
    row.append(tdQuestion, tdResult, tdCorrect, tdAnswer);
    tbody.appendChild(row);
  }
  table.append(thead, tbody);
  tableDiv.appendChild(table);
  mainScreen.appendChild(tableDiv);

  createActionButtons();
}

function createActionButtons() {
  const actionDiv = document.createElement('div');
  actionDiv.classList.add('columns');
  for (let i = 0; i < 5; i++) {
  const columnDiv = document.createElement('div');
  columnDiv.classList.add('column');
  if (i === 1) {
    const retryButton = document.createElement("button");
    retryButton.className = "button is-primary is-medium is-fullwidth";
    retryButton.id = "retry";
    retryButton.textContent = "Try Again";
    retryButton.addEventListener("click", retryQuiz);
    columnDiv.appendChild(retryButton);
  } else if (i === 3) {
    const selectModeButton = document.createElement("button");
    selectModeButton.className = "button is-primary is-medium is-fullwidth";
    selectModeButton.id = "selectMode";
    selectModeButton.textContent = "Back Home";
    selectModeButton.addEventListener("click", selectMode);
    columnDiv.appendChild(selectModeButton);
  }

  actionDiv.append(columnDiv);
  mainScreen.appendChild(actionDiv);
  }
}

function retryQuiz() {
  resetQuiz();
  createQuizFrame();
  displayQuiz();
}

function selectMode() {
  resetQuiz();
  clearMainScreen();
  displayModeSelectionScreen();
}

function resetQuiz() {
  currentQuizIndex = 0;
  quizzes = [];
  userAnswers = [];
  answerButtonIndices = [];
  correctButtonIndices = [];
  correctness = [];
}

function displayModeSelectionScreen() {
  // Display the initial mode selection screen
  // (Assuming this is implemented in another function)
}

function createAndAppendMainScreenContent() {
  const container = document.createElement('div');
  container.className = 'has-text-centered';

  const title1 = document.createElement('h2');
  title1.className = 'title';
  title1.textContent = '問題選択';
  container.appendChild(title1);

  const flexContainer = document.createElement('div');
  flexContainer.className = 'is-flex is-justify-content-center is-align-items-center';
  container.appendChild(flexContainer);

  const selectFromContainer = document.createElement('div');
  selectFromContainer.className = 'select mr-5 is-primary';
  const selectFrom = document.createElement('select');
  selectFrom.name = 'from';
  selectFrom.id = 'from';
  selectFrom.innerHTML = `
    <option value="1">元素記号</option>
    <option value="2">元素名</option>
    <option value="0">原子番号</option>
  `;
  selectFrom.addEventListener("change", isSameMode);
  selectFromContainer.appendChild(selectFrom);
  flexContainer.appendChild(selectFromContainer);

  flexContainer.appendChild(document.createTextNode('から'));

  const selectToContainer = document.createElement('div');
  selectToContainer.className = 'select ml-5 is-primary';
  const selectTo = document.createElement('select');
  selectTo.name = 'to';
  selectTo.id = 'to';
  selectTo.innerHTML = `
    <option value="1">元素記号</option>
    <option value="2" selected>元素名</option>
    <option value="0">原子番号</option>
  `;
  selectTo.addEventListener("change", isSameMode);
  selectToContainer.appendChild(selectTo);
  flexContainer.appendChild(selectToContainer);
  container.appendChild(document.createElement('br'));
  const errorMessage = document.createElement('div');
  errorMessage.id = 'error_message';
  container.appendChild(errorMessage);
  container.appendChild(document.createElement('br'));

  const title2 = document.createElement('h2');
  title2.className = 'title';
  title2.textContent = '難易度選択';
  container.appendChild(title2);

  const selectLevelContainer = document.createElement('div');
  selectLevelContainer.className = 'select is-primary';
  const selectLevel = document.createElement('select');
  selectLevel.name = 'level';
  selectLevel.id = 'level';
  selectLevel.innerHTML = `
    <option value="24">EASY MODE</option>
    <option value="49" selected>NORMAL MODE</option>
    <option value="74">HARD MODE</option>
    <option value="117">LUNATIC MODE</option>
  `;
  selectLevelContainer.appendChild(selectLevel);
  container.appendChild(selectLevelContainer);

  container.appendChild(document.createElement('br'));
  container.appendChild(document.createElement('br'));

  const startButton = document.createElement('button');
  startButton.className = 'button is-primary is-medium is-rounded';
  startButton.id = 'start';
  startButton.textContent = 'Start';
  startButton.addEventListener("click", startQuiz);
  container.appendChild(startButton);

  mainScreen.appendChild(container);
  isSameMode();
}

function startQuiz() {
  getMode();
  clearMainScreen();
  createQuizFrame();
  displayQuiz();
}

window.onload = createAndAppendMainScreenContent;

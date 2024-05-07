import { elements_list } from "./data.js";
const start_button = document.getElementById("start");
const main_screen = document.getElementById("main_screen");

function clearMainScreen() {
  // Remove all elements inside main_screen
  while (main_screen.firstChild) {
    main_screen.removeChild(main_screen.firstChild);
  }
};

function getLevel() {
  // get the level
  const level = document.getElementById("level");
  const level_value = level.value;
  return level_value;
};

function getFrom() {
  // get the from
  const from = document.getElementById("from");
  const from_value = from.value;
  return from_value;
}

function getTo() {
  // get the to
  const to = document.getElementById("to");
  const to_value = to.value;
  return to_value;
}

function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateQues() {
  const level = getLevel();
  var rand = randBetween(1, level)

  // Create a question
  var question = elements_list[rand][from];
  return question;
}

function generateQuestion() {
  const level = getLevel();
  const from = getFrom();
  const to = getTo();
  var options = [];
  // Create an option
  for (var i = 0; i < 3; i++) {
    var option = randBetween(1, level);
    // if the option is the same as the correct answer, generate a new option
    while (options.includes(option)) {
      option = randBetween(1, level);
    }
    options.push(option);
  }
  var correct = options[randBetween(0, 2)];
  options.push(correct);
  return options;
}

function displayQuestion(options) {
  const question = options[3];

  // 新しい要素を作成
  const newDiv = document.createElement("div");
  newDiv.className = "box is-size-3";
  newDiv.textContent =question;

  // 改行要素を作成
  const brElements = document.createElement("br");

  // オプションのテキストとIDの配列
  const optionTexts = options.slice(0, 2);
  const optionIds = ["option1", "option2", "option3"];

  // columns 要素を作成
  const columnsDiv = document.createElement("div");
  columnsDiv.className = "columns";
  columnsDiv.id = "options";

  // オプションのボタンを生成して columns 要素に追加
  for (let i = 0; i < optionTexts.length; i++) {
    const column = document.createElement("div");
    column.className = "column";

  const button = document.createElement("button");
  button.className = "button is-primary is-fullwidth is-medium";
  button.id = optionIds[i];
  button.textContent = optionTexts[i];

  column.appendChild(button);
  columnsDiv.appendChild(column);
  }
  // 要素を追加
  main_screen.appendChild(newDiv);
  main_screen.appendChild(brElements);
  main_screen.appendChild(brElements.cloneNode(true));
  main_screen.appendChild(columnsDiv);
}

start_button.addEventListener("click", function() {
  clearMainScreen();
  displayQuestion(generateQuestion());
});
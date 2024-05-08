import { elements_list } from "./data.js";
import { clearMainScreen } from "./functions.js";
const start_button = document.getElementById("start");
const main_screen = document.getElementById("main_screen");



function getMode() {
  var level = document.getElementById("level").value;
  var from = document.getElementById("from").value;
  var to = document.getElementById("to").value;
  return [level, from, to];
}

function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateQuestion() {
  var [level, from, to] = getMode();
  clearMainScreen();
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
  var correct = options[randBetween(0, 2)] // 正しい答えのインデックスを生成
  options.push(correct);
  options = shuffle(options);
  options.push(from, to);
  return options;
}

function shuffle(array) {
  var correct = array[3];
  array = array.slice(0, 3);
  for (let i = array.length - 1; i > 0; i--) {
    const j = randBetween(0, i);
    [array[i], array[j]] = [array[j], array[i]];
  }
  array.push(correct);
  return array;
}


function displayQuestion(options) {
  const from = options[4];
  switch (from) {
    case 0:
      question = "原子番号" + options[3];
      break;
    case 1:
      question = "元素記号" + options[3];
      break;
    case 2:
      question = "元素名" + options[3];
      break;
  }
  const to = options[5];

  // 新しい要素を作成
  const newDiv = document.createElement("div");
  newDiv.className = "box is-size-3 has-text-centered";
  newDiv.textContent = question;

  // 改行要素を作成
  const brElements = document.createElement("br");

  // オプションのテキストとIDの配列
  const optionTexts = options.slice(0, 3);
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
    button.textContent = elements_list[optionTexts[i]][to];
    console.log(elements_list[optionTexts[i]][to]);
    console.log(optionTexts[i]);
    console.log(i)

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
  displayQuestion(generateQuestion());
});
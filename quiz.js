import { elements_list } from "./data.js";
import { clearMainScreen } from "./functions.js";
const start_button = document.getElementById("start");
const main_screen = document.getElementById("main_screen");
var curQuizIdx = 0;
var quizzes = [];
var answers = [];
var corrBtnIdx = [];



function getMode() {

  const level = document.getElementById("level").value;
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;

  localStorage.setItem("level", level);
  localStorage.setItem("from", from);
  localStorage.setItem("to", to);

}

function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = randBetween(0, i);
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

function createQuizFrame(){
  // 新しい要素を作成
  const newDiv = document.createElement("div");
  newDiv.className = "box is-size-3 has-text-centered";
  newDiv.id = "quizFrame";

  // 改行要素を作成
  const brElements = document.createElement("br");

  // オプションのテキストとIDの配列
  const optionIds = ["option1", "option2", "option3"];

  // columns 要素を作成
  const columnsDiv = document.createElement("div");
  columnsDiv.className = "columns";
  columnsDiv.id = "optionButtons";

  // オプションのボタンを生成して columns 要素に追加
  for (var i = 0; i < 3; i++) {
    const column = document.createElement("div");
    column.className = "column";

    const button = document.createElement("button");
    button.className = "button is-primary is-fullwidth is-medium option";
    button.addEventListener("click", function() {
      getAns(i);
    });
    button.id = optionIds[i];

    column.appendChild(button);
    columnsDiv.appendChild(column);
  }
  // 要素を追加
  main_screen.appendChild(newDiv);
  main_screen.appendChild(brElements);
  main_screen.appendChild(brElements.cloneNode(true));
  main_screen.appendChild(columnsDiv);
}

function genQuiz() {
  var level = localStorage.getItem("level");
  var options = [];
  do {
    options = [];
    while (options.length < 3) {
      var temp = randBetween(0, level);
      if (!options.includes(temp)) {
        options.push(temp);
      }
    }
    options = shuffle(options);
    var rand = randBetween(0, 2);
    var quis = options[rand];
  } while (quizzes.includes(quis));
    quizzes.push(quis);
    corrBtnIdx.push(rand);
  console.log(options);
  console.log(corrBtnIdx);
  return options;
}

function genPreText() {
  var from = localStorage.getItem("from");
  switch (from) {
    case "0":
      var preText = "原子番号 ";
      break;
    case "1":
      var preText = "元素記号 ";
      break;
    case "2":
      var preText = "元素名 ";
      break;
  }
  return preText;
}

function displayQuiz() {
  var quizFrame = document.getElementById("quizFrame");
  var from = localStorage.getItem("from");
  var to = localStorage.getItem("to");
  var options = genQuiz();
  var quiz = quizzes[curQuizIdx];
  var preText = genPreText();

  var quiz = preText + elements_list[quiz][from];
  quizFrame.textContent = quiz;

  const buttons = document.getElementsByClassName('option');
  for (let j = 0; j < 3; j++) {
    buttons[j].textContent = elements_list[options[j]][to];
    buttons[j].value = elements_list[options[j]][to];
  }

  console.log(curQuizIdx);
  curQuizIdx++;
}

function getAns(btnIdx) {
  answers.push(btnIdx);
  if (answers.length < 20) {
    displayQuiz();
  } else {
    console.log("end");
  }
}

function compareAnswer() {
  var quizs = localStorage.getItem("quizs");
  var answer = localStorage.getItem("answer");
  tORf = [];
  for (var i = 0; i < 20; i++) {
    if (elements_list[quizs[i]][0] == answer[i]) {
      tORf.push(true);
    } else {
      tORf.push(false);
    }
  }

  localStorage.setItem("tORf", tORf);
}

start_button.addEventListener("click", function() {
  getMode();
  clearMainScreen();
  createQuizFrame();
  displayQuiz();
});
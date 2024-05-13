import { elements_list } from "./data.js";
import { clearMainScreen } from "./functions.js";
const start_button = document.getElementById("start");
const main_screen = document.getElementById("main_screen");



function getMode() {
  var level = document.getElementById("level").value;
  var from = document.getElementById("from").value;
  var to = document.getElementById("to").value;
  localStorage.setItem("level", level);
  localStorage.setItem("from", from);
  localStorage.setItem("to", to);
}

function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
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

function createQuizFrame(question, optionTexts, to){
    // 新しい要素を作成
  const newDiv = document.createElement("div");
  newDiv.className = "box is-size-3 has-text-centered";
  newDiv.textContent = question;

  // 改行要素を作成
  const brElements = document.createElement("br");

  // オプションのテキストとIDの配列
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


// 出題済みの問題を格納する配列
var askedQuestions = [];

function generateQuestion() {
  var level = localStorage.getItem("level");
  var from = localStorage.getItem("from");
  var to = localStorage.getItem("to");
  clearMainScreen();
  var options = [];
  var question;
  
  do {
    // 新しい問題を生成
    options = [];
    for (var i = 0; i < 3; i++) {
      var option = randBetween(1, level);
      // if the option is the same as the correct answer or already asked, generate a new option
      while (options.includes(option) || askedQuestions.includes(option)) {
        option = randBetween(1, level);
      }
      options.push(option);
    }
    // 正解のインデックスを生成
    var correct = options[randBetween(0, 2)];
    options.push(correct);
    options = shuffle(options);
    // 出題済みの問題として登録
    askedQuestions.push(options[3]);
    // 出題された問題が20問に達しているかどうかを確認
    if (askedQuestions.length >= 20) {
      // 出題数が20問に達したら、出題済み問題リストをリセット
      askedQuestions = [];
    }
    // 出題された問題が20問に達していなければ、ループを終了
  } while (askedQuestions.length < 20);
  
  return options;
}

async function displayQuestion() {
  var questions = [];
  var answer = [];
  // 20問の問題を生成して出題
  for (var i = 0; i < 20; i++) {
    var options = generateQuestion();
    var level = localStorage.getItem("level");
    var from = localStorage.getItem("from");
    var to = localStorage.getItem("to");
    var question = options[3];
    questions.push(question);
    switch  (from) {
      case "0":
        var question = "原子番号 " + elements_list[question][from];
        break;
      case "1":
        var question = "元素記号 " + elements_list[question][from];
        break;
      case "2":
        var question = "元素名 " + elements_list[question][from];
        break;
      default:
        var question = "エラーです。m9(^Д^)ﾌﾟｷﾞｬｰ"
    }
    
    var optionTexts = options.slice(0, 3);

    createQuizFrame(question, optionTexts, to);
    var option1 = document.getElementById("option1");
    var option2 = document.getElementById("option2");
    var option3 = document.getElementById("option3");
    
    var user_selected = await Promise.race([
      new Promise(resolve => option1.addEventListener("click", () => resolve(optionTexts[0]))),
      new Promise(resolve => option2.addEventListener("click", () => resolve(optionTexts[1]))),
      new Promise(resolve => option3.addEventListener("click", () => resolve(optionTexts[2])))
    ]);
    // 出題された問題の回答を保存
    answer.push(user_selected);
  }
  localStorage.setItem("questions", questions);
  localStorage.setItem("answer", answer);
  setTimeout(clearMainScreen, 1000);
  compareAnswer();
}




function compareAnswer() {
  var questions = localStorage.getItem("questions");
  var answer = localStorage.getItem("answer");
  t_or_f = [];
  for (var i = 0; i < 20; i++) {
    if (elements_list[questions[i]][0] == answer[i]) {
      t_or_f.push(true);
    } else {
      t_or_f.push(false);
    }
  }

  localStorage.setItem("t_or_f", t_or_f);
}

start_button.addEventListener("click", function() {
  getMode();
  displayQuestion();
});
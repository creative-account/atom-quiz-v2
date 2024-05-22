import { elements_list } from "./data.js";
import { clearMainScreen } from "./functions.js";
const main_screen = document.getElementById("main_screen");
var tORf = localStorage.getItem("tORf");
var correctCount = 0;
var wrongCount = 0;

function countCorrect() {
  for (let i = 0; i < tORf.length; i++) {
    if (tORf[i] == "正解") {
      correctCount++;
    }
  }
  wrongCount = tORf.length - correctCount;
  console.log(correctCount, wrongCount);
}

export function displayScore() {
  var from = localStorage.getItem("from");
  var to = localStorage.getItem("to");
  var quizzes = localStorage.getItem("quizzes");
  var answers = localStorage.getItem("answers");
  console.log(quizzes);
  countCorrect();
  const mainScreen = document.getElementById('main_screen');
  var newDiv = document.createElement('div');
  newDiv.classList.add('box');
  const columnsDiv = document.createElement('div');
  columnsDiv.classList.add('columns');
  for (let i = 0; i < 5; i++) {
    const columnDiv = document.createElement('div');
    columnDiv.classList.add('column');
    if (i === 1) {
      const checkSpan = document.createElement('span');
      checkSpan.classList.add('material-symbols-outlined', 'correct', 'has-text-success', 'mr-4', 'big-icon');
      checkSpan.textContent = 'check';
      const correctSpan = document.createElement('span');
      correctSpan.classList.add('is-size-3');
      correctSpan.id = 'correct';
      correctSpan.textContent = correctCount;
      columnDiv.appendChild(checkSpan);
      columnDiv.appendChild(correctSpan);
    } else if (i === 3) {
      const closeSpan = document.createElement('span');
      closeSpan.classList.add('material-symbols-outlined', 'has-text-danger', 'mr-4' , 'big-icon');
      closeSpan.textContent = 'close';
      const wrongSpan = document.createElement('span');
      wrongSpan.classList.add('is-size-3');
      wrongSpan.id = 'wrong';
      wrongSpan.textContent = wrongCount;
      columnDiv.appendChild(closeSpan);
      columnDiv.appendChild(wrongSpan);
    }
    columnsDiv.appendChild(columnDiv);
  }
  newDiv.appendChild(columnsDiv);
  mainScreen.appendChild(newDiv);
  var newDiv = null;
  // 新しいdiv要素を作成
  var newDiv = document.createElement('div');
  newDiv.classList.add('box');

  // table要素を作成
  const table = document.createElement('table');
  table.classList.add('table', 'is-fullwidth', 'is-striped');

  // thead要素を作成
  const thead = document.createElement('thead');
  const theadRow = document.createElement('tr');
  const th1 = document.createElement('th');
  th1.textContent = '問題';
  const th2 = document.createElement('th');
  th2.textContent = '正誤';
  const th3 = document.createElement('th');
  th3.textContent = '正解';
  const th4 = document.createElement('th');
  th4.textContent = 'あなたの解答';

  // theadRowにth要素を追加
  theadRow.appendChild(th1);
  theadRow.appendChild(th2);
  theadRow.appendChild(th3);
  theadRow.appendChild(th4);

  // theadにtheadRowを追加
  thead.appendChild(theadRow);

  // tbody要素を作成
  const tbody = document.createElement('tbody');

  // tbodyに20個のtr要素を追加
  for (let row = 0; row < 20; row++) {
    const tbodyRow = document.createElement('tr');
    for (let col = 0; col < 4; col++) {
      const td = document.createElement('td');
      switch (col) {
        case 0:
          td.textContent = elements_list[quizzes[row]][from];
          break;
        case 1:
          td.textContent = tORf[row];
          break;
        case 2:
          td.textContent = elements_list[quizzes[row]][to];
          break;
        case 3:
          td.textContent = elements_list[answers[row]][to];
          break;
      }
      tbodyRow.appendChild(td);
    }
    tbody.appendChild(tbodyRow);
  }

  // tableにtheadとtbodyを追加
  table.appendChild(thead);
  table.appendChild(tbody);

  // newDivにtableを追加
  newDiv.appendChild(table);

  // newDivをmainScreenに追加
  mainScreen.appendChild(newDiv);

}

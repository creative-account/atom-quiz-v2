import { elements_list } from "./data";

function displayScore() {
  var t_or_f = localStorage.getItem("t_or_f");
  
}

// 要素を作成する関数
function createTable() {
  var from = localStorage.getItem("from");
  var to = localStorage.getItem("to");
  const boxDiv = document.createElement("div");
  boxDiv.className = "box";

  const table = document.createElement("table");
  table.className = "table";

  // 20行のループでtr要素を作成
  for (let i = 0; i < 20; i++) {
    const tr = document.createElement("tr");

    // 各行に4つのtd要素を作成
    for (let j = 0; j < 4; j++) {
      const td = document.createElement("td");
      switch (j) {
        case 0:
          td.textContent = elements_list[i][from];
          break;
        case 1:
          if (t_or_f == "true") {
            td.textContent = "正解";
          }else{
            td.textContent = "不正解";
          }
          break;
        case 2:
          td.textContent = "3";
          break;
        case 3:
          td.textContent = "4";
          break;
      }
      tr.appendChild(td);
    }

    table.appendChild(tr);
  }

  boxDiv.appendChild(table);
  return boxDiv;
}

// 要素をbodyに追加する関数
function appendTableToBody() {
  const table = createTable();
  document.body.appendChild(table);
}

// ページ読み込み時に実行
window.addEventListener("DOMContentLoaded", function() {
  appendTableToBody();
});

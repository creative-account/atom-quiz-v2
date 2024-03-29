const button = document.getElementById("start");
const mainScreen = document.getElementById("main_screen");

function deleteElements() {
  while(mainScreen.firstChild){
    mainScreen.removeChild(mainScreen.firstChild);
  }
  console
}

function createLevelSelectButtons() {
  const buttonTexts = ['イージー', 'ノーマル', 'ハード'];
  const buttonIds = ['easy', 'normal', 'hard'];
  
  // columns 要素を作成します
  const divColumns = document.createElement('div');
  divColumns.className = 'columns';
  
  // ボタンを作成し、columns 要素に追加します
  for (let i = 0; i < buttonTexts.length; i++) {
    const divColumn = document.createElement('div');
    divColumn.className = 'column';
    
    const button = document.createElement('button');
    button.className = 'button is-medium is-fullwidth is-primary';
    button.id = buttonIds[i];
    button.textContent = buttonTexts[i];
    
    divColumn.appendChild(button);
    divColumns.appendChild(divColumn);
  }
  
  // main_screen の div 要素を取得して、作成した要素を追加します
  mainScreen.appendChild(divColumns);
}


button.addEventListener("click", () => {
  deleteElements();
});
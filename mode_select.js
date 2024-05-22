export function isSameMode() {
  const error_message = document.getElementById("error_message");
  const start_button = document.getElementById("start");
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  if (from == to) {
    error_message.innerHTML = '<div class="notification">同じモードを選択しています。<br>異なるモードを選択してください。</div>';
    start_button.disabled = true;
  } else {
    error_message.innerHTML = "";
    start_button.disabled = false;
  }

}


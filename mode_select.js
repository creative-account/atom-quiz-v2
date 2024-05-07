const start_button = document.getElementById("start");

function isSameMode() {
  // get the from
  const from = document.getElementById("from");
  const from_value = from.value;
  // get the to
  const to = document.getElementById("to");
  const to_value = to.value;
  if (from_value == to_value) {
    return true;
  } else {
    return false;
  }
}

// Run isSameMode function when a window is loaded
window.onload = function() {
  if (isSameMode()) {
    document.getElementById("error_message").innerHTML = '<div class="notification">同じモードを選択しています。<br>異なるモードを選択してください。</div>';
    start_button.disabled = true;
  }else{
    document.getElementById("error_message").innerHTML = "";
    start_button.disabled = false;
  }
};

document.getElementById("from").addEventListener("change", function() {
  if (isSameMode()) {
    document.getElementById("error_message").innerHTML = '<div class="notification">同じモードを選択しています。<br>異なるモードを選択してください。</div>';
    start_button.disabled = true;
  }else{
    document.getElementById("error_message").innerHTML = "";
    start_button.disabled = false;
  }
});

document.getElementById("to").addEventListener("change", function() {
  if (isSameMode()) {
    document.getElementById("error_message").innerHTML = '<div class="notification">同じモードを選択しています。<br>異なるモードを選択してください。</div>';
    start_button.disabled = true;
  }else{
    document.getElementById("error_message").innerHTML = "";
    start_button.disabled = false;
  }
});


// Execute discriminationTheme function on page load to determine if it's the first visit
// If it's the first visit, set the theme based on the device's theme. Otherwise, apply the previous theme.
// Use addEventListener to switch the theme every time the button is clicked.

// Definition of variables and constants
const html = document.getElementById("html");
const button = document.getElementById("switchTheme");
var status = "";
console.log("initialized variables");

// Mark the page as visited
function applyVisited(status) {
  localStorage.setItem("status", status);
  console.log("done applyVisited");
}

// Apply the theme
function applyTheme(themeName) {
  localStorage.setItem("theme", themeName);
  html.setAttribute("data-theme", themeName);
  if (themeName == "dark") {
    button.setAttribute("data-theme", "light");
    button.innerHTML = '<span class="material-symbols-outlined mr-3">light_mode</span>ライトモード';
    console.log("switched to dark theme");
  } else if (themeName == "light") {
    button.setAttribute("data-theme", "dark");
    button.innerHTML = '<span class="material-symbols-outlined mr-3">dark_mode</span>ダークモード';
    console.log("switched to light theme");
  }
  console.log("done applyTheme");
}

// Initialize the theme
function initialTheme() {
  const isDark = matchMedia("(prefers-color-scheme: dark)").matches;
  if (isDark) {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }
  console.log("done initialTheme");
}

// Retrieve the saved theme
function getStorageTheme() {
  const storageTheme = localStorage.getItem("theme");
  if (storageTheme == "dark") {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }
  console.log("done getStorageTheme");
}

// Determine if it's the first visit
function discriminationTheme() {
  const getStrageVisited = localStorage.getItem("status");
  if (getStrageVisited) {
    getStorageTheme();
  } else {
    initialTheme();
    applyVisited("visited");
  }
  console.log("done discriminationTheme");
}

// Switch the theme
function switchTheme() { 
  const storageTheme = localStorage.getItem("theme");
  if (storageTheme != "dark") {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }
  console.log("done switchTheme");
}

// Add event listener for the button click event to switch the theme
button.addEventListener('click', () => {
  switchTheme();
});

// Add event listener for page load event to run discriminationTheme function
window.addEventListener("load", (event) => {
  discriminationTheme()
});

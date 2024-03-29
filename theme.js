// Execute discriminationTheme function on page load to determine if it's the first visit
// If it's the first visit, set the theme based on the device's theme. Otherwise, apply the previous theme.
// Use addEventListener to switch the theme every time the themeSwitchButton is clicked.

// Definition of variables and constants
const html = document.getElementById("html");
const themeSwitchButton = document.getElementById("switchTheme");
var status = "";

// Mark the page as visited
function applyVisited(status) {
  localStorage.setItem("status", status);
}

// Apply the theme
function applyTheme(themeName) {
  localStorage.setItem("theme", themeName);
  html.setAttribute("data-theme", themeName);
  if (themeName == "dark") {
    themeSwitchButton.setAttribute("data-theme", "light");
    themeSwitchButton.innerHTML = '<span class="material-symbols-outlined mr-3">light_mode</span>ライトモード';
  } else if (themeName == "light") {
    themeSwitchButton.setAttribute("data-theme", "dark");
    themeSwitchButton.innerHTML = '<span class="material-symbols-outlined mr-3">dark_mode</span>ダークモード';
  }
}

// Initialize the theme
function initialTheme() {
  const isDark = matchMedia("(prefers-color-scheme: dark)").matches;
  if (isDark) {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }
}

// Retrieve the saved theme
function getStorageTheme() {
  const storageTheme = localStorage.getItem("theme");
  if (storageTheme == "dark") {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }
}

// Determine if it's the first visit
function discriminationTheme() {
  const getStrageVisited = localStorage.getItem("status");
  if (getStrageVisited) {
    getStorageTheme();
  } else {
    initialTheme();
    applyVisited("visited");
  };
}

// Switch the theme
function switchTheme() { 
  const storageTheme = localStorage.getItem("theme");
  if (storageTheme != "dark") {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }
}

// Add event listener for the themeSwitchButton click event to switch the theme
themeSwitchButton.addEventListener('click', () => {
  switchTheme();
});

// Add event listener for page load event to run discriminationTheme function
window.addEventListener("load", (event) => {
  discriminationTheme()
});

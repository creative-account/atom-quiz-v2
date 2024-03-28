const html = document.getElementById("html");
const button = document.getElementById("switchTheme");
const icon = document.getElementById("icon");

function applyVisited(status) {
  status = "";
  sessionStorage.setItem("status", status);
}

function applyTheme(themeName) {
  sessionStorage.setItem("theme", themeName);
  html.setAttribute("data-theme", themeName);
  if (themeName === "dark") {
    button.textContent = "ダークモード";
    icon.textContent = "dark_mode";
  } else if (themeName === "light") {
    button.textContent = "ライトモード";
    icon.textContent = "light_mode";
  }
}


function initialTheme() {
  const isDark = matchMedia("(prefers-color-scheme: dark)").matches;
  if (isDark) {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }
}

function getStorageTheme() {
  const storageTheme = sessionStorage.getItem("theme");
  if (storageTheme !== "dark") {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }
}


function discriminationTheme() {
  const getStrageVisited = sessionStorage.getItem("status");
  if (getStrageVisited) {
    getStorageTheme();
  } else {
    initialTheme();
    applyVisited("visted");
  }
}

document.getElementById("switchTheme").addEventListener('click', () => {  
  const storageTheme = sessionStorage.getItem("theme");
  if (storageTheme !== "theme-dark") {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }
})
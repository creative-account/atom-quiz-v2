export function clearMainScreen() {
  const main_screen = document.getElementById("main_screen");
  // Remove all elements inside main_screen
  while (main_screen.firstChild) {
    main_screen.removeChild(main_screen.firstChild);
  }
};
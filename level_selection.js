// "Start" button is clicked, the elements on the screen are cleared, and the level selection elements are displayed.

// Definition of variables and constants
const startButton = document.getElementById("start");
const mainScreen = document.getElementById("main_screen");
let handleButtonClick; // Variable to store the listener function

// Function to clear elements on the screen
function deleteElements() {
  while (mainScreen.firstChild) {
    mainScreen.removeChild(mainScreen.firstChild);
  }
  // The listener function to be removed must be the same, so use a named function
  startButton.removeEventListener("click", handleButtonClick);
}

// Function to display buttons for selecting levels
function createLevelSelectButtons() {
  const buttonTexts = ['イージー', 'ノーマル', 'ハード']; // Button texts
  const buttonIds = ['easy', 'normal', 'hard']; // Button IDs

  const divColumns = document.createElement('div'); // Create columns element
  divColumns.className = 'columns'; // Set class name

  // Loop through the button texts and create buttons
  for (let i = 0; i < buttonTexts.length; i++) {
    const divColumn = document.createElement('div'); // Create column element
    divColumn.className = 'column'; // Set class name

    const button = document.createElement('button'); // Create button element
    button.className = 'button is-medium is-fullwidth is-primary'; // Set class name
    button.id = buttonIds[i]; // Set button ID
    button.textContent = buttonTexts[i]; // Set button text

    divColumn.appendChild(button); // Append button to column
    divColumns.appendChild(divColumn); // Append column to columns
  }

  mainScreen.appendChild(divColumns); // Append columns to main_screen
}

// Define the listener function
handleButtonClick = () => {
  deleteElements(); // Clear elements
  createLevelSelectButtons(); // Display level selection buttons
};

startButton.addEventListener("click", handleButtonClick); // Add event listener to startButton

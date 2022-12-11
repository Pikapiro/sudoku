document.getElementById("welcomeScreen").style.display = "none";
document.getElementById("sudokuScreen").style.display = "none";
document.getElementById("mainScreen").style.display = "block";

function check(form) {
  let compareId = "abcd";
  let comparePsd = "1234";

  if (form.userid.value != compareId || form.pswrd.value != comparePsd) {
    document.getElementById("mainScreen").style.display = "block";
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("sudokuScreen").style.display = "none";

    if (
      form.userid.value != compareId ||
      (form.userid.value == "" && form.pswrd.value != comparePsd) ||
      form.pswrd.value == ""
    ) {
      window.alert("Please put a valid  user and password");
    } else if (form.userid.value != compareId || form.userid.value == " ") {
      window.alert("Please put a valid  user");
    } else if (form.pswrd.value != comparePsd || form.pswrd.value == "") {
      window.alert("Please put a valid  pasword ");
    }
  } else {
    if (form.userid.value == compareId && form.pswrd.value == comparePsd) {
      document.getElementById("titleWelcomeScreen").innerHTML +=
        document.getElementById("userid").value;

      document.getElementById("mainScreen").style.display = "none";
      document.getElementById("welcomeScreen").style.display = "block";
      document.getElementById("sudokuScreen").style.display = "none";
    }
  }
}

document.getElementById("welcomeScreen").style.display = "none";
document.getElementById("sudokuScreen").style.display = "none";
document.getElementById("mainScreen").style.display = "block";
const easy = [
  "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
  "685329174971485326234761859362574981549618732718293465823946517197852643456137298",
];
const medium = [
  "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
  "619472583243985617587316924158247369926531478734698152891754236365829741472163895",
];
const hard = [
  "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
  "712583694639714258845269173521436987367928415498175326184697532253841769976352841",
];

let selectedNum;
let selectedBox;
let disableSelect;

function startGame() {
  document.getElementById("welcomeScreen").style.display = "none";
  document.getElementById("sudokuScreen").style.display = "block";
  document.getElementById("mainScreen").style.display = "none";
  
  for (let i = 0; i < id("number-container").children.length; i++) {
    id("number-container").children[i].addEventListener("click", function () {
      // if selecting is not disabled
      if (!disableSelect) {
        // if number is already selected
        if (this.classList.contains("selected")) {
          //Then remove selection
          this.classList.remove("selected");
          selectedNum = null;
        } else {
          //deselect all other numbers
          for (let i = 0; i < 9; i++) {
            id("number-container").children[i].classList.remove("selected");
          }
          // Select it and update selectedNum variable
          this.classList.add("selected");
          selectedNum = this;
          console.log(selectedNum);
          updateMove();
        }
      }
    });
  }

  let board;
  if (id("diff-1").checked) board = easy[0];
  else if (id("diff-2").checked) board = medium[0];
  else board = hard[0];

  disableSelect = false;

  // creates board based on difficulty
  generateBoard(board);


 
}

function generateBoard(board) {
  //clear previous board
  clearPrevious();
  // let used to increment box ids
  let idCount = 0;
  //Create 81 boxes
  for (let i = 0; i < 81; i++) {
    //Create a new paragraph element
    let box = document.createElement("p");
    //if the box is not empty
    if (board.charAt(i) != "-") {
      //Set box text to correct number
      box.textContent = board.charAt(i);
    } else {
      //Add click event listener to box
      box.addEventListener("click", function () {
        //if selection is not disabled(means u can select)
        if (!disableSelect) {
          //if the box is already selected
          if (box.classList.contains("selected")) {
            // remove the selection
            box.classList.remove("selected");
            selectedTile = null;
          } else {
            // deselect all other boxes
            for (let i = 0; i < 81; i++) {
              qsa(".box")[i].classList.remove("selected");
            }
            // Add selection and update variable
            box.classList.add("selected");
            selectedBox = box;
            console.log(selectedBox);
            updateMove();
          }
        }
      });
    }
    //Assign box id
    box.id = idCount;
    //Increment for next box
    idCount++;
    //Add boxclass to all boxes
    box.classList.add("box");

    if ((box.id > 17 && box.id < 27) || (box.id > 44 && box.id < 54)) {
      box.classList.add("bottomBorder");
    }
    if ((box.id + 1) % 9 == 3 || (box.id + 1) % 9 == 6) {
      box.classList.add("rightBorder");
    }
    //Add box to board
    id("board").appendChild(box);
  }
}

function updateMove() {
  // if a box and a number is selected
  if (selectedBox && selectedNum) {
    // set the box to the correct number
    selectedBox.textContent = selectedNum.textContent;
    // if the number matches the corresponding number in the solution key
    if (checkCorrect(selectedBox)) {
      //  Deselect the boxes
      selectedBox.classList.remove("selected");
      selectedNum.classList.remove("selected");
      // Clear the selected variables
      selectedNum = null;
      selectedBox = null;
      //Check if the board is completed
      if (checkDone()) {
        window.alert("you won!");
      }
      // if the number does not match the solution key
    } else {
      disableSelect = true;
      // Make the tile turn red
      selectedBox.classList.add("incorrect");
      //Run  1 sec
      setTimeout(function () {
        disableSelect = false;

        // Restore box color and remove selected from both
        selectedBox.classList.remove("incorrect");
        selectedBox.classList.remove("selected");
        selectedNum.classList.remove("selected");
        // Clear the box text content and clear selected variables
        selectedBox.textContent = "";
        selectedBox = null;
        selectedNum = null;
      }, 1000);
    }
  }
}

function checkDone() {
  let boxes = qsa(".box");
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].textContent === "") return false;
  }
  return true;
}
//

function checkCorrect(box) {
  //Set solution based on difficulty level selection
  let solution;
  if (id("diff-1").checked) solution = easy[1];
  else if (id("diff-2").checked) solution = medium[1];
  else solution = hard[1];
  // if boxes number is equal to the solution's number
  if (solution.charAt(box.id) === box.textContent) return true;
  else return false;
}

function clearPrevious() {
  //Access all of the boxes
  let boxes = qsa(".box");
  // remove all of the boxes
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].remove();
  }

  //Deselect any numbers
  for (let i = 0; i < id("number-container").children.length; i++) {
    id("number-container").children[i].classList.remove("selected");
  }

  //Clear selected variables
  selectedNum = null;
  selectedBox = null;
}


// reset the game and choose different level
function reset() {
  document.getElementById("welcomeScreen").style.display = "block";
  document.getElementById("sudokuScreen").style.display = "none";
  document.getElementById("mainScreen").style.display = "none";
}
//helper functions
function id(id) {
  return document.getElementById(id);
}
function qs(selector) {
  return document.querySelector(selector);
}
function qsa(selector) {
  return document.querySelectorAll(selector);
}

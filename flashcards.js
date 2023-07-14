const generalContainer = document.getElementById("general-container");
const addFlashButton  = document.getElementById("add-flash-button");
const cardDisplay = document.getElementById("cards-display");
const flashEditor = document.getElementById("flashcard-editor");
const cancelButton = document.getElementById("cancel-button");
const errorMessage = document.querySelector(".error-message");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const submitButton = document.getElementById("submit-button")
let editing = false;
var listAnswerQuestionString = localStorage.getItem("listAnswerQuestion");
var listAnswerQuestion=[];
var listAnswerQuestion=JSON.parse(listAnswerQuestionString);
var question_card=[];
var answer_card=[];    

function localStorageCards() {
  for (var i = 0; i < listAnswerQuestion.length; i++) {
    question_card = listAnswerQuestion[i][0];
    answer_card = listAnswerQuestion[i][1];
    generateCard();
  }
}  

localStorageCards()

addFlashButton.addEventListener("click", ()=>{
  cardDisplay.classList.add("hide");
  generalContainer.classList.add("hide");
  flashEditor.classList.remove("hide");
  cancelButton.classList.remove("hide")
  answer.value="";
  question.value="";
});

cancelButton.addEventListener(
  "click", 
  (hideFunction = ()=>{
    flashEditor.classList.add("hide");
    generalContainer.classList.remove("hide");
    cardDisplay.classList.remove("hide")
  })
);

submitButton.addEventListener (
  "click",
  (submitQuestion = () =>{
    editing=false;
    tempQuestion=question.value.trim();
    tempAnswer=answer.value.trim();
    if (!tempQuestion || !tempAnswer) {
      errorMessage.classList.remove("hide");
    } else {
      errorMessage.classList.add("hide");
      generalContainer.classList.remove("hide");
      flashEditor.classList.add("hide");      
      cardDisplay.classList.remove("hide");
      let setQuestionAnswer = [tempQuestion, tempAnswer];
      listAnswerQuestion.unshift(setQuestionAnswer);
      
      listAnswerQuestionString = JSON.stringify(listAnswerQuestion);
      localStorage.setItem("listAnswerQuestion", listAnswerQuestionString);
      question_card=question.value;
      answer_card=answer.value;
      generateCard();
      answer.value="";
      question.value = "";
    }    
  }))

  function generateCard(){ 
    
    // card
    var cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDisplay.appendChild(cardDiv);
    
    //question
    cardDiv.innerHTML += 
    `<p class="question-div">${question_card}</p>`;
    //answer
    var displayAnswer = document.createElement ("p");
    displayAnswer.classList.add("answer-div", "hide");
    displayAnswer.innerText=answer_card;
    cardDiv.appendChild(displayAnswer);
    var cardButtons = document.createElement("div");
    cardButtons.classList.add("card-buttons")
    cardDiv.appendChild(cardButtons)
    //display
    var displayButton = document.createElement("button");
    displayButton.classList.add("show-hide-button");
    displayButton.addEventListener(
      "click",()=>{
        displayAnswer.classList.toggle("hide");
    })
    displayButton.innerHTML= "Show/Hide";
    cardButtons.appendChild(displayButton);
    //edit
    var editButton = document.createElement("button");
    cardButtons.appendChild(editButton);

    editButton.classList.add("edit-button");
    editButton.innerHTML = "Edit";
    editButton.addEventListener("click", ()=>{
      editing=true;
      modifyElement(editButton, true);
      generalContainer.classList.add("hide");
      flashEditor.classList.remove("hide"); 
      cancelButton.classList.add("hide")
    })
    const modifyElement = (element, edit = false) =>{
        let parentDiv = element.parentElement.parentElement;
        let parentQuestion = parentDiv.querySelector(".question-div").innerText;
        if (edit){        
          let parentAnswer = parentDiv.querySelector(".answer-div").innerText;
          answer.value =parentAnswer;
          question.value = parentQuestion;        
        } 
        var filteredArray = listAnswerQuestion.filter(function(subArray) {
          return subArray.includes(parentQuestion);
        });
        console.log(filteredArray)
        for (var i = 0; i < filteredArray.length; i++) {
          var index = listAnswerQuestion.indexOf(filteredArray[i]);
          if (index !== -1) {
            listAnswerQuestion.splice(index, 1);
          }
        }
        
        console.log(listAnswerQuestion);
        listAnswerQuestionString = JSON.stringify(listAnswerQuestion);
        localStorage.setItem("listAnswerQuestion", listAnswerQuestionString);
        console.log(localStorage);
        parentDiv.remove()
      }

    //delete
    let deleteButton = document.createElement("button");
    cardButtons.appendChild(deleteButton);
    deleteButton.innerText= "Delete";
    let warningDelete = document.createElement("div");
    warningDelete.classList.add("hide");
    let deleteMessage = document.createElement("h3");
    deleteMessage.classList.add("delete-message");
    deleteMessage.innerText = "Are you sure you want to delete your flashcard ?"
    let deleteYes = document.createElement("button");
    deleteYes.innerText = "Yes";
    let deleteNo = document.createElement("button");
    deleteNo.innerText="No";
    warningDelete.appendChild(deleteMessage);
    warningDelete.appendChild(deleteYes);
    warningDelete.appendChild(deleteNo);
    cardDiv.appendChild(warningDelete);  
    
    deleteButton.addEventListener("click", ()=>{
      warningDelete.classList.remove("hide");
      
    })
    deleteNo.addEventListener("click", ()=>{
      warningDelete.classList.add("hide");
    })
    deleteYes.addEventListener("click", ()=>{
      modifyElement(deleteButton);
    } )   
  


  }
  



    
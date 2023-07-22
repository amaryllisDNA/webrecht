class flashcard {
    constructor(question, answer, semester, fach){
        this.question=question;
        this.answer=answer;
        this.semester=semester;
        this.fach=fach
    }
}

var newList = localStorage.getItem("listAnswerQuestion");
let newerList=JSON.parse(newList)
let flashcardArray=JSON.parse(localStorage.getItem("arrayFlashcards"))
let listFlashcards;

let search=newerList[3][0]

for (i=0;i<=flashcardArray.length;i++){
    if(flashcardArray[i].question == search){
        index=i;
        flashcardArray.splice(index, 1);

    }
}

/*for(i=0; i<=newerList.length;i++){
    let addArray = ["so23","eu-recht"] 
    newerList[i].push(addArray[0]);
    newerList[i].push(addArray[1]);
    flashcardArray.push(new flashcard (newerList[i][0],newerList[i][1],newerList[i][2],newerList[i][3]))
}
*/



const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What is the capital of France",
        choice1: "Paris",
        choice2: "Nice",
        choice3: "Lyon",
        choice4: "Toulouse",
        answer: 1
    },
    {
        question: "The first successful vaccine was introduced by Edward Jenner in 1796. Which disease did it guard against?",
        choice1: "The plague",
        choice2: "Small Pox",
        choice3: "Polio",
        choice4: "Covid1",
        answer: 2
    },
    {
        question: "What year did World War I begin?",
        choice1: "1914",
        choice2: "1905",
        choice3: "1919",
        choice4: "1916",
        answer: 1
    },
    {
        question: "Which of these species is not extinct?",
        choice1: "Japanese sea lion",
        choice2: "Tasmanian tiger",
        choice3: "Saudi gazelle",
        choice4: "Komodo dragon",
        answer: 4
    },
    {
        question: "Which planet is the hottest?",
        choice1: "Venus",
        choice2: "Saturn",
        choice3: "Mercury",
        choice4: "Mars",
        answer: 1
    },
    {
        question: "What is the name for the Jewish New Year?",
        choice1: "Hanukkah",
        choice2: "Yom Kippur",
        choice3: "Kwanza",
        choice4: "Rosh Hashanah",
        answer: 1
    },
    {
        question: "What is Shakespeare’s shortest tragedy?",
        choice1: "Macbeth",
        choice2: "Hamlet",
        choice3: "Romeo & Juliet",
        choice4: "Othello",
        answer: 1
    },
    {
        question: "In which city were Anne Frank and her family in hiding?",
        choice1: "Paris",
        choice2: "Brussels",
        choice3: "Amsterdam",
        choice4: "Frankfurt",
        answer: 3
    },
    {
        question: "Who, in the Harry Potter series, is Tom Riddle?",
        choice1: "A student in Harry’s class",
        choice2: "A professor at Hogwarts",
        choice3: "Harry’s birth father",
        choice4: "Voldemort",
        answer: 4
    },
    {
        question: "What was the name of the boy who won Willy Wonka’s factory?",
        choice1: "Charlie Baxter",
        choice2: "Charlie Bucket",
        choice3: "Charlie Brown",
        choice4: "Charlie Bones",
        answer: 2
    },
    {
        question: "How often does the moon orbit the Earth?",
        choice1: "Every 7 days",
        choice2: "Every 27 days",
        choice3: "Every 30 days",
        choice4: "Every 365 days",
        answer: 2
    },
    {
        question: "Which poet wrote the poem “The Raven”? ",
        choice1: "Robert Frost",
        choice2: "Edgar Allen Poe",
        choice3: "Walt Whitman",
        choice4: "Sylvia Plath",
        answer: 2
    },
    {
        question: "“I see dead people” is a line from which horror film?",
        choice1: "The Sixth Sense",
        choice2: "The Grudge",
        choice3: "The Shining",
        choice4: "The Exorcist",
        answer: 1
    },
    {
        question: "Who wrote the novel Slaughterhouse-Five?",
        choice1: "Stephen King",
        choice2: "J.D. Salinger",
        choice3: "Kurt Vonnegut",
        choice4: "Harper Lee",
        answer: 3
    },
    {
        question: "In Ray Bradbury’s novel Fahrenheit 451, what are they burning?",
        choice1: "Clothes",
        choice2: "Houses",
        choice3: "Books",
        choice4: "Money",
        answer: 3
    },
    {
        question: "In which US state did the Salem Witch Trials take place?",
        choice1: "Washington",
        choice2: "Virginia",
        choice3: "Pennsylvania",
        choice4: "Massachusetts",
        answer: 4
    },
    {
        question: "What is the rarest blood type?",
        choice1: "O",
        choice2: "A",
        choice3: "B",
        choice4: "AB-Negative",
        answer: 4
    },
    {
        question: "Holly Golightly is a character in which film?",
        choice1: "Pretty In Pink",
        choice2: "Breakfast at Tiffanys",
        choice3: "Funny Face",
        choice4: "Singing In The Rain",
        answer: 2
    },
    {
        question: "How many bones are there in the human body?",
        choice1: "206",
        choice2: "209",
        choice3: "201",
        choice4: "204",
        answer: 1
    },
    {
        question: " In golf, where does the Masters take place?",
        choice1: "Pebble Beach",
        choice2: "Augusta",
        choice3: "Oakmont",
        choice4: "Bethpage",
        answer: 2
    }
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};
getNewQuestion = () => {
    if(availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("./end.html");
    }
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
    const questionIndex =Math.floor(Math.random()* availableQuestions.length);
    currentQuestion =availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];

    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e =>{
     if(!acceptingAnswers) return;
     acceptingAnswers = false;
     const selectedChoice = e.target;
     const selectedAnswer = selectedChoice.dataset['number'];

     const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
     if(classToApply == 'correct'){
         incrementScore(CORRECT_BONUS)
     }
    
    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout( () =>{
        selectedChoice.parentElement.classList.remove(classToApply);
     getNewQuestion();
    }, 2000)
    
    })
});

incrementScore = num =>{
    score += num;
    scoreText.innerText = score;
}

startGame();

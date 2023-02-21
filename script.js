var quizpart = document.getElementById("quiz");
var startpage = document.getElementById("startpg");
//quiz start variables
var startbtn = document.getElementById("startbtn");
var timer = document.getElementById("timer");
var questions = document.getElementById("questions");
var btnA = document.getElementById("A");
var btnB = document.getElementById("B");
var btnC = document.getElementById("C");
var btnD = document.getElementById("D");
// quiz end variables
var gameover = document.getElementById("GameOver");
var endbtns = document.getElementById("endbtns");
var results = document.getElementById("results");
var finalscore = document.getElementById("finalscore");
//highscore info variables
var hspg = document.getElementById("hspg");
var hscontainter = document.getElementById("hscontainer");
var hsnameinput = document.getElementById("initials");
var hsname = document.getElementById("hsinitials");
var submiths = document.getElementById("submiths");
var hsdisplay = document.getElementById("highscore");
var submiths = document.getElementById("SubmitHS");

//questions
var qquestions = [{
    question: "What does HTML stand for?",
    choiceA: "Language is just a human construct",
    choiceB: "HyperText Markup Langauge",
    choiceC: "Hard Tough Makeshift Language",
    choiceD: "HyperText Multidimentional Language",
    Answer: "B"},

    {
    question: "What is the purpose of CSS?",
    choiceA: "Creates the page's style",
    choiceB: "There is no purose to it... similar to life (not in a sad way, but in a freeing way)",
    choiceC: "It is the only language needed to make a website",
    choiceD: "It's used to create interactive web content.",
    Answer: "A"},

    {
    question: "What is the DOM?",
    choiceA: "Desktop Operation Model",
    choiceB: "Digital Order Mode",
    choiceC: "Document Object Model",
    choiceD: "Documentation Order Management",
    Answer: "C"},

    {
    question: "What is the skeleton of all web design code developement?",
    choiceA: "HTML",
    choiceB: "CSS",
    choiceC: "Javascript",
    choiceD: "Python",
    Answer: "A"},

    {
    question: "What is Bootstrap?",
    choiceA: "database for Javascript code.",
    choiceB: "language for creating websites without javascript",
    choiceC: "the most popular CSS Framework for developing responsive and mobile-first websites",
    choiceD: "Nothing. It is nothing.",
    Answer: "C"},

    ];

//various variables
var fquestionindex = qquestions.length;
var cquestionindex = 0;
var timeleft= 60;
var score = 0;
var correct;
var timerClock;


//Quiz Start function
function startQuiz(){
    gameover.style.display = "none";
    startpage.style.display = "none";
    generatequizQuestion();

    //timer display
    timerClock = setInterval(function() {
        timeleft--;
        timer.textContent = "Time Left: " + timeleft;

        if (timeleft === 0) {
            clearInterval(timernumber);
            showScore();
        }
    }, 1000);
    quizpart.style.display = "block";
}

// question loop
function generatequizQuestion(){
    gameover.style.display = "none";
    if (cquestionindex === fquestionindex){
        return showScore();
    }
    var cquestion = qquestions[cquestionindex];
    console.log(cquestion);
    questions.innerHTML = "<p>" + cquestion.question + "</p>";
    console.log(cquestionindex);
    btnA.innerHTML = cquestion.choiceA;
    btnB.innerHTML = cquestion.choiceB;
    btnC.innerHTML = cquestion.choiceC;
    btnD.innerHTML = cquestion.choiceD;
}

//end page that shows score
function showScore(){
    quizpart.style.display = "none";
    gameover.style.display = "flex";
    clearInterval(timerClock);
    // hsnameinput.value = "";

    finalscore.textContent = "You got " + score + " out of " + qquestions.length + " correct!";
}

//highscore submit 
submiths.addEventListener("click", function highscore() {
    if (hsnameinput.value === "") {
        alert ("initials must be filled in");
        return false;
    }else{
        var hssave = JSON.parse(localStorage.getItem("hssave")) || [];
        var user = hsnameinput.value.trim();
        var hscurrent = {
            name : user,
            score : score
        };

        gameover.style.display = "none";
        hscontainter.style.display = "block";
        endbtns.style.display = "flex";

        hssave.push(hscurrent);
        localStorage.setItem("hsdisplay", JSON.stringify(hssave));
        generatehs();
    }
});

function generatehs(){
    hsname.innerHTML = "";
    hsdisplay.innerHTML = "";
    var hs = JSON.parse(localStorage.getItem("hsdisplay")) || [];
    for (i=0; i<hs.length; i++){
        var newinitials = document.createElement("li");
        var newscore = document.createElement("li");
        newinitials.textContent = hs[i].name;
        newscore.textContent = hs[i].score;
        hsdisplay.appendChild(newinitials);
        hsdisplay.appendChild(newscore);
    }
}

function showHS(){
    startpage.style.display = "none";
    gameover.style.display = "none";
    hscontainter.style.display = "flex";
    hspg.style.display = "block";
    endbtns.style.display = "flex";

    generatehs();
}

//clears high score board text
function clearHS(){
    window.localStorage.clear();
    hsname.textContent = "";
    hsdisplay.textContent = "";
}

//quiz replay function
function replay(){
    hscontainter.style.display = "none";
    gameover.style.display = "none";
    startpage.style.display = "flex";
    timeleft = 70;
    score = 0;
    cquestionindex = 0;
}

//question answer check
function Answercheck(answer){
    Answer = qquestions[cquestionindex].Answer;
    console.log(Answer);
    console.log(cquestionindex);
    console.log(qquestions);
    console.log(answer);


    if (answer === Answer && cquestionindex !== fquestionindex){
        score++;
        console.log(score);
        alert("Correct! :)");
        cquestionindex++;
        generatequizQuestion();
    }else if (answer !== Answer && cquestionindex !== fquestionindex){
        alert("Incorrect :(")
        cquestionindex++;
        generatequizQuestion();
    }else{
        showScore();
    }
}

//start quiz
startbtn.addEventListener("click",startQuiz);
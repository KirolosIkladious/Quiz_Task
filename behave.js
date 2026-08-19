const questions=[
{t:"HTML",q:"What does HTML stand for?",a:["Hyper Text Markup Language","High Text Machine Language","Home Tool Markup Language","Hyperlink Text Management Language"],c:0},
{t:"CSS",q:"Which property changes text color?",a:["font-color","text-color","color","text-style"],c:2},
{t:"JavaScript",q:"Which keyword declares a variable that can be reassigned?",a:["const","let","static","define"],c:1},
{t:"HTML",q:"Which element creates a hyperlink?",a:["<link>","<a>","<url>","<href>"],c:1},
{t:"CSS",q:"Which layout system is designed for one-dimensional layouts?",a:["Grid","Flexbox","Float","Table"],c:1},
{t:"JavaScript",q:"Which method adds an item to the end of an array?",a:["add()","insert()","push()","append()"],c:2},
{t:"HTML",q:"Which attribute provides alternative text for an image?",a:["src","title","alt","text"],c:2},
{t:"CSS",q:"Which property adds space inside an element's border?",a:["margin","padding","gap","space"],c:1},
{t:"JavaScript",q:"Which operator checks strict equality?",a:["==","=","===","!="],c:2},
{t:"CSS",q:"Which selector targets an element with the id 'main'?",a:[".main","#main","*main","main#"],c:1}
];

let index=0;
let score=0;
let answered=false;

const start=document.getElementById("start");
const quiz=document.getElementById("quiz");
const result=document.getElementById("result");
const question=document.getElementById("question");
const answers=document.getElementById("answers");
const feedback=document.getElementById("feedback");
const next=document.getElementById("next");

function show(el){[start,quiz,result].forEach(x=>x.classList.add("hidden"));el.classList.remove("hidden")}

function loadQuestion(){
const q=questions[index];
answered=false;
document.getElementById("number").textContent=index+1;
document.getElementById("score").textContent=score;
document.getElementById("topic").textContent=q.t;
document.getElementById("question").textContent=q.q;
document.getElementById("progress").style.width=((index+1)/questions.length*100)+"%";
feedback.textContent="";
next.disabled=true;
next.textContent=index===questions.length-1?"See Results":"Next";
answers.innerHTML="";
q.a.forEach((text,i)=>{
const button=document.createElement("button");
button.className="answer";
button.textContent=String.fromCharCode(65+i)+". "+text;
button.onclick=()=>choose(button,i);
answers.appendChild(button);
});
}

function choose(button,i){
if(answered)return;
answered=true;
const q=questions[index];
const buttons=document.querySelectorAll(".answer");
buttons.forEach(b=>b.disabled=true);
if(i===q.c){
score++;
button.classList.add("correct");
feedback.textContent="Correct!";
}else{
button.classList.add("wrong");
buttons[q.c].classList.add("correct");
feedback.textContent="Not quite. The correct answer is "+q.a[q.c]+".";
}
document.getElementById("score").textContent=score;
next.disabled=false;
}

function finish(){
document.getElementById("finalScore").textContent=score;
document.getElementById("message").textContent=score===10?"Perfect score!":score>=7?"Great job!":"Keep practicing!";
show(result);
}

document.getElementById("startBtn").onclick=()=>{index=0;score=0;show(quiz);loadQuestion()};
next.onclick=()=>{if(index===questions.length-1)finish();else{index++;loadQuestion()}};
document.getElementById("again").onclick=()=>{index=0;score=0;show(quiz);loadQuestion()};
document.getElementById("home").onclick=()=>show(start);
document.getElementById("theme").onclick=()=>{
document.body.classList.toggle("dark");
document.getElementById("theme").textContent=document.body.classList.contains("dark")?"☀":"☾";
};

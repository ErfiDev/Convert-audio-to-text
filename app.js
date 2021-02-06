window.onload = alert("لطفا از اتصال به اینترنت مطئن شوید..."); 

const section = document.querySelector(".section");
const container = document.querySelector('.container');
const p = document.createElement("p");
const span = document.createElement("span");
span.classList.add("spanC");
const btnClear = document.querySelector(".clear-text");
const btnCopy = document.querySelector(".copy-text");

btnClear.addEventListener("click" , clear);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = 'fa-IR';

recognition.interimResults = true;
recognition.start();

recognition.addEventListener('end' , recognition.start);

recognition.addEventListener("result" , (e)=>{

    container.appendChild(p);

    let transcript = Array.from(e.results)
    .map((result)=>{
        return result[0];
    }).map((result)=>{
        return result.transcript;
    }).join(" ");

    
    let array = [];
    array += transcript + " ";

    if(e.results[0].isFinal)
    {
        span.textContent += array;
        p.appendChild(span);
    }

    let transcriptKey = Array.from(e.results)
    .map((item)=>{
        return item[0];
    }).map((item)=>{
        return item.transcript;
    }).toString("");

    if(transcript.includes("دارک"))
    {
        section.classList.add("dark");
    }
    if(transcriptKey.includes("لایت"))
    {
        section.classList.remove("dark");
    }

    if(transcript.includes("علامت سوال"))
    {
        transcript = transcript.replace("علامت سوال" , "؟");
    }

    if(transcript.includes("برو به خط بعد"))
    {
        p.innerHTML += "<br />";
    }
});


function clear()
{
    span.innerHTML = "";
}
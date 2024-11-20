const btnJokeGenerator = document.getElementById('joke_generator'); 
const synth = window.speechSynthesis; 
const voices = synth.getVoices(); 
let beginAnimation; 

async function getData(){
    const url = 'https://v2.jokeapi.dev/joke/Any?lang=en&type=twopart'; 
    try{
        const response = await fetch(url); 
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`); 
        }
        const json = await response.json(); 
        arrangeJoke(json['setup'], json['delivery']);     
        textToSpeach(json['setup'], json['delivery']);  
        beginAnimation = setInterval(animateBot, 850); 
    }catch(error){
        console.log(error.message); 
    }
}

function arrangeJoke(setup, delivery){
    const pSetup = document.getElementById('setup'); 
    const pDelivery = document.getElementById('delivery'); 

    pSetup.textContent = `Setup: ${setup}`; 
    pDelivery.textContent = `Delivery: ${delivery}`; 
}

function textToSpeach(setup, delivery){
    const utterThis = new SpeechSynthesisUtterance(setup + ' ' + delivery);
    utterThis.voice = voices[1];  
    synth.speak(utterThis); 
}
//used to determine current sprite
let curr = 0; 
const sprite = ['closed-mouth-man.png', 'open-mouth-man.png'];

function animateBot(){
    let imgElement = document.querySelector("img"); 
    switch(curr){
        case 0:
            imgElement.src = sprite[0];
            curr++; 
            break; 
        case 1: 
            imgElement.src = sprite[1]; 
            curr--; 
            break; 
        default:
            imgElement.src = sprite[0]; 
    }
}

document.addEventListener('keydown', (e) => {
    if(e.key === 'j' || e.key === 'J'){
        clearInterval(beginAnimation);         
        getData(); 
    }
});

btnJokeGenerator.addEventListener('click', () => {
    clearInterval(beginAnimation); 
    getData();    
});

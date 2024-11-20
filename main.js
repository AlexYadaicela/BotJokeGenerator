const btnJokeGenerator = document.getElementById('joke_generator'); 
const synth = window.speechSynthesis; 
const voices = synth.getVoices(); 
console.log(voices); 

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

document.addEventListener('keydown', (e) => {
    if(e.key === 'j' || e.key === 'J'){
        getData(); 
    }
});

btnJokeGenerator.addEventListener('click', () => {
    getData();     
});

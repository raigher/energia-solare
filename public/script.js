// Gestione del form di contatto
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Impedisce l'invio del form

    // Recupera i valori inseriti dall'utente
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validazione semplice
    if (!name || !email || !message) {
        alert('Per favore, compila tutti i campi.');
        return;
    }

    // Simula l'invio del form (puoi sostituirlo con una richiesta AJAX o Fetch API)
    console.log('Form inviato con successo!');
    console.log('Nome:', name);
    console.log('Email:', email);
    console.log('Messaggio:', message);

    // Mostra un messaggio di conferma all'utente
    alert('Grazie per il tuo messaggio! Ti risponderemo al più presto.');

    // Resetta il form
    document.getElementById('contact-form').reset();
});

// Funzione per lo scroll fluido ai link interni
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Impedisce il comportamento predefinito del link

        const targetId = this.getAttribute('href').substring(1); // Rimuove il # dall'href
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // Scroll fluido verso l'elemento target
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Funzione per aggiungere un effetto di highlight alle sezioni quando sono visibili
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1 // Trigger quando il 10% della sezione è visibile
});

sections.forEach(section => {
    observer.observe(section);
});

// Inizializza il grafico
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('myChart').getContext('2d');

    const years = Array.from({ length: 26 }, (_, i) => 2000 + i); // Anni dal 2000 al 2025

    // Dati stimati basati sul trend del grafico (ipotesi di crescita costante)
    const capacity = [20, 25, 30, 38, 45, 55, 70, 85, 100, 120, 145, 170, 200, 230, 270, 300, 330, 360, 380, 400, 420, 440, 460, 480, 500, 520]; 
    const energyYield = capacity.map(c => c * 0.8); // Relazione approssimativa

    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [
                {
                    label: 'Capacità solare termica (GWₜ)',
                    data: capacity,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Energia prodotta (TWh)',
                    data: energyYield,
                    type: 'line',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});

// Pulsante "Torna su"
const backToTopButton = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    backToTopButton.classList.toggle('visible', window.scrollY > 300);
});
backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Quiz avanzato
const quizData = [
    {
        question: "Qual è l'efficienza media dei pannelli solari commerciali?",
        answers: ["10-15%", "20-25%", "30-35%", "40-45%"],
        correct: 1
    },
    {
        question: "Quale materiale è più usato nei pannelli fotovoltaici?",
        answers: ["Silicio", "Grafene", "Alluminio", "Rame"],
        correct: 0
    },
    {
        question: "Quale paese produce più energia solare?",
        answers: ["Stati Uniti", "Cina", "Germania", "India"],
        correct: 1
    },
    {
        question: "Come funziona un pannello fotovoltaico?",
        answers: ["Con il vento", "Con l'energia del sole", "Con l'acqua", "Con il calore terrestre"],
        correct: 1
    },
    {
        question: "Qual è la principale fonte di energia rinnovabile nel mondo?",
        answers: ["Solare", "Eolica", "Idroelettrica", "Geotermica"],
        correct: 0
    },
    {
        question: "Qual è la durata media di un pannello solare?",
        answers: ["5 anni", "10 anni", "25-30 anni", "50 anni"],
        correct: 2
    },
    {
        question: "Qual è l'unità di misura dell'energia solare prodotta?",
        answers: ["Watt", "Volt", "Joule", "TWh"],
        correct: 3
    },
    {
        question: "Quale componente di un pannello solare converte la luce in energia?",
        answers: ["Inverter", "Celle fotovoltaiche", "Batteria", "Regolatore di carica"],
        correct: 1
    },
    {
        question: "Quale innovazione sta migliorando l'efficienza dei pannelli solari?",
        answers: ["Celle bifacciali", "Materiali più pesanti", "Diminuzione della superficie", "Uso di plastica"],
        correct: 0
    },
    {
        question: "Dove si possono installare i pannelli solari?",
        answers: ["Solo sui tetti", "In qualsiasi area con sole", "Solo in campagna", "Solo vicino all'acqua"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;

function updateProgress() {
    const progress = (currentQuestion / quizData.length) * 100;
    document.querySelector('.quiz-progress-bar').style.width = `${progress}%`;
}

function showQuestion() {
    const questionElement = document.getElementById('quiz-question');
    const answersElement = document.getElementById('quiz-answers');
    const resultElement = document.getElementById('quiz-result');
    
    questionElement.innerHTML = quizData[currentQuestion].question;
    answersElement.innerHTML = '';
    resultElement.innerHTML = '';
    
    quizData[currentQuestion].answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'quiz-answer';
        button.innerHTML = answer;
        button.onclick = () => checkAnswer(index);
        answersElement.appendChild(button);
    });
}

function showResult() {
    const quizContainer = document.querySelector('.quiz-container');
    let emoji = '';
    
    if (score === quizData.length) {
        emoji = '😁';
    } else if (score >= quizData.length * 0.7) {
        emoji = '😊';
    } else if (score >= quizData.length * 0.4) {
        emoji = '😐';
    } else {
        emoji = '😢';
    }

    quizContainer.innerHTML = `
        <div class="quiz-result-final">
            <h3>Quiz completato! ${emoji}</h3>
            <p>Punteggio: ${score}/${quizData.length}</p>
            <div class="result-feedback">
                <p>${getFeedbackMessage(score)}</p>
            </div>
            <button onclick="location.reload()">Riprova</button>
        </div>
    `;
}

// Aggiungi questa funzione helper per i messaggi personalizzati
function getFeedbackMessage(score) {
    const percentage = (score / quizData.length) * 100;
    
    if (percentage === 100) return 'Perfetto! Sei un esperto di energia solare!';
    if (percentage >= 70) return 'Ottimo lavoro! Continua così!';
    if (percentage >= 40) return 'Non male, ma puoi fare di meglio!';
    return 'Riprova e impara di più sull\'energia solare!';
}

function checkAnswer(selected) {
    const answers = document.querySelectorAll('.quiz-answer');
    const correctIndex = quizData[currentQuestion].correct;
    
    answers.forEach((answer, index) => {
        answer.classList.remove('correct', 'wrong');
        if(index === correctIndex) {
            answer.classList.add('correct');
        }
        if(index === selected && index !== correctIndex) {
            answer.classList.add('wrong');
        }
    });
    
    if(selected === correctIndex) score++;
    
    setTimeout(() => {
        currentQuestion++;
        if(currentQuestion < quizData.length) {
            updateProgress();
            showQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

// Inizializza quiz
document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'quiz-progress-bar';
    document.querySelector('.quiz-progress').appendChild(progressBar);
    showQuestion();
});

// Newsletter
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('newsletter-email').value;
    const messageElement = document.getElementById('newsletter-message');
    
    fetch('http://localhost:3000/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        messageElement.textContent = data.message;
        messageElement.style.color = data.success ? 'green' : 'red';
        if(data.success) {
            document.getElementById('newsletter-form').reset();
            setTimeout(() => {
                messageElement.textContent = '';
            }, 5000);
        }
    })
    .catch(error => {
        console.error('Errore:', error);
        messageElement.textContent = 'Errore di connessione al server';
        messageElement.style.color = 'red';
    });
});

// Tema scuro
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');
const body = document.body;

// Controlla se il tema scuro è già salvato
if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('dark-mode');
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
}

// Funzione per cambiare tema
function toggleTheme() {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
        localStorage.setItem('dark-mode', 'disabled');
    }
}

// Aggiungi evento di click
sunIcon.addEventListener('click', toggleTheme);
moonIcon.addEventListener('click', toggleTheme);
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Gestione del form di contatto
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    fetch('http://localhost:3000/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            alert('Messaggio inviato con successo!');
            this.reset();
        } else {
            alert('Errore nell\'invio: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Errore:', error);
        alert('Errore di connessione al server');
    });
});
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Configurazione middleware
app.use(cors());
app.use(bodyParser.json());

// Configura Nodemailer per Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'righieimer@gmail.com', // Sostituisci con la tua email
        pass: 'zcdd dzli thxj qjar' // Sostituisci con la tua password (usa variabili d'ambiente in produzione)
    },
    tls: {
        rejectUnauthorized: false 
    }
});

// Endpoint per la newsletter (se necessario)
app.post('/subscribe', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email non valida' });
    }

    const mailOptions = {
        from: 'righieimer@gmail.com',
        to: email,
        subject: 'Iscrizione Newsletter Confermata',
        html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2 style="color: #FF6B35;">Benvenuto nella nostra newsletter!</h2>
                <p>Grazie per esserti iscritto alle ultime novità sull'energia solare.</p>
                <p>Riceverai aggiornamenti su:</p>
                <ul>
                    <li>Nuove tecnologie solari</li>
                    <li>Risultati del nostro progetto</li>
                    <li>Eventi e workshop</li>
                </ul>
                <hr style="border: 1px solid #eee;">
                <p style="font-size: 0.9em; color: #666;">
                    Questo è un messaggio automatico, non rispondere a questa email.
                </p>
              </div>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Errore invio email:', error);
            return res.status(500).json({ success: false, message: 'Errore durante l\'iscrizione' });
        }
        console.log('Email inviata:', info.response);
        res.json({ success: true, message: 'Iscrizione completata! Controlla la tua email.' });
    });
});

// Modifica l'endpoint /contact
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ 
            success: false, 
            message: 'Tutti i campi sono obbligatori.' 
        });
    }

    const mailOptions = {
        from: 'righieimer@gmail.com', // Usa sempre la tua email come mittente
        to: 'righieimer@gmail.com',   // Email dove ricevere i messaggi
        replyTo: email,               // Permette di rispondere al mittente
        subject: `Nuovo messaggio da ${name}`,
        html: `
            <h3>Nuovo messaggio dal sito</h3>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Messaggio:</strong></p>
            <p>${message}</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Errore invio email:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Errore durante l\'invio del messaggio.' 
            });
        }
        res.json({ 
            success: true, 
            message: 'Messaggio inviato con successo!' 
        });
    });
});

// Avvio del server
app.listen(PORT, () => {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
});


// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.post('/contact', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'Phaneros014@gmail.com', // YOUR ACTUAL EMAIL
            pass: 'Praise@123'
        }
    });

    const mailOptions = {
        from: req.body.email,
        to: 'Phaneros014@gmail.com', // YOUR ACTUAL EMAIL
        subject: req.body.subject,
        text: `From: ${req.body.name}\n\n${req.body.message}`
    };

    transporter.sendMail(mailOptions);
    res.json({ success: true });
});

document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const spinner = form.querySelector('#spinner');
    const btnText = form.querySelector('#btnText');
    const successMessage = document.getElementById('successMessage');

    // Show loading state
    btnText.textContent = "Sending...";
    spinner.style.display = "block";
    submitBtn.disabled = true;

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Show success message
            form.style.display = "none";
            successMessage.style.display = "block";
            form.reset();
        } else {
            throw new Error("Failed to send message");
        }
    } catch (error) {
        alert("Error sending message. Please try again later.");
        console.error(error);
    } finally {
        // Reset button state
        btnText.textContent = "Send Message";
        spinner.style.display = "none";
        submitBtn.disabled = false;
    }
});
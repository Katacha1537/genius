// pages/api/sendEmail.js

import nodemailer from 'nodemailer';

export default async (req, res) => {
    if (req.method === 'POST') {
        const { email, authKey } = req.body;

        // Configuração do transporte
        let transporter = nodemailer.createTransport({
            host: 'relay.mailbaby.net', // Substitua pelo seu servidor SMTP
            port: 465,
            secure: true, // true para port 465, false para outras portas
            auth: {
                user: 'mb67406', // Seu usuário de autenticação SMTP
                pass: 'TRrZEB6hgF628aMGnA8w' // Sua senha de autenticação SMTP
            },
        });

        // Opções do email
        let mailOptions = {
            from: 'noreply@geniusecom.io',
            to: email,
            subject: 'Faça login na Genius',
            html: `<!DOCTYPE html>\n<html lang=\"pt-BR\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Email de Login</title>\n  <style>\n    .button {\n      display: inline-block;\n      padding: 10px 20px;\n      font-size: 16px;\n      color: white;\n      background-color: #841AD4;\n      text-decoration: none;\n      border-radius: 5px;\n    }\n  </style>\n</head>\n<body>\n  <p>Olá,</p>\n  <p>Recebemos uma solicitação de login na Genius.</p>\n  <p>Se você quiser fazer login com a conta <strong>${email}</strong>, clique no botão abaixo:</p>\n  <p>\n    <a href=\"http://localhost:3000/finishSignUp?authKey=${authKey}\" class=\"button\">Entrar na Genius</a>\n  </p>\n  <p>Caso não tenha solicitado esse link, ignore este e-mail.</p>\n  <p>Obrigado,</p>\n  <p>Equipe Genius.</p>\n</body>\n</html>`,
        };

        try {
            // Enviar email
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error sending email', details: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};

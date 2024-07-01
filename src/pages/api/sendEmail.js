import nodemailer from 'nodemailer';

export default async (req, res) => {
    if (req.method === 'POST') {
        const { email, authKey } = req.body;

        if (!email || !authKey) {
            return res.status(400).json({ error: 'Missing email or authKey' });
        }

        // Configuração do transporte
        let transporter;
        try {
            transporter = nodemailer.createTransport({
                host: process.env.NEXT_PUBLIC__SMTP_HOST,
                port: parseInt(process.env.NEXT_PUBLIC__SMTP_PORT, 10),
                secure: process.env.NEXT_PUBLIC__SMTP_SECURE === 'true',
                auth: {
                    user: process.env.NEXT_PUBLIC__SMTP_USER,
                    pass: process.env.NEXT_PUBLIC__SMTP_PASSWORD
                },
            });
        } catch (error) {
            return res.status(500).json({ error: 'Error setting up transporter', details: error.message });
        }

        // Títulos e conteúdos possíveis
        const titles = [
            'Acesso da Genius!',
            'Sua Porta de Entrada na Genius!',
            'Link de Acesso da Genius!',
            'Entre na Genius Agora!'
        ];

        const contents = [
            `<!DOCTYPE html>
            <html lang="pt-BR">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Email de Login</title>
              <style>
                .button {
                  display: inline-block;
                  padding: 10px 20px;
                  font-size: 16px;
                  color: #ffffff;
                  background-color: #007BFF;
                  text-decoration: none;
                  border: none;
                  border-radius: 5px;
                  cursor: pointer;
                }
              </style>
            </head>
            <body>
              <p>Olá,</p>
              <p>Recebemos uma solicitação de login na Genius.</p>
              <p>Se você quiser fazer login com a conta <strong>${email}</strong>, clique no botão abaixo:</p>
              <p>
                <a href="https://login.geniusecom.io/finishSignUp/${authKey}/${email}" class="button">Entrar na Genius</a>
              </p>
              <p>Caso não tenha solicitado esse link, ignore este e-mail.</p>
              <p>Obrigado,</p>
              <br>
              <p>--<br>Equipe Genius Ecom<br><a href="https://login.geniusecom.io">geniusecom.io</a></p>
            </body>
            </html>`,

            `<!DOCTYPE html>
            <html lang="pt-BR">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Email de Login</title>
              <style>
                .button {
                  display: inline-block;
                  padding: 10px 20px;
                  font-size: 16px;
                  color: #ffffff;
                  background-color: #007BFF;
                  text-decoration: none;
                  border: none;
                  border-radius: 5px;
                  cursor: pointer;
                }
              </style>
            </head>
            <body>
              <p>Olá,</p>
              <p>Você solicitou acesso à sua conta Genius.</p>
              <p>Para entrar com a conta <strong>${email}</strong>, clique no botão abaixo:</p>
              <p>
                <a href="https://login.geniusecom.io/finishSignUp/${authKey}/${email}" class="button">Acessar a Genius</a>
              </p>
              <p>Se não foi você que pediu este link, apenas ignore este e-mail.</p>
              <p>Obrigado,</p>
              <br>
              <p>--<br>Equipe Genius Ecom<br><a href="https://login.geniusecom.io">geniusecom.io</a></p>
            </body>
            </html>`,

            `<!DOCTYPE html>
            <html lang="pt-BR">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Email de Login</title>
              <style>
                .button {
                  display: inline-block;
                  padding: 10px 20px;
                  font-size: 16px;
                  color: #ffffff;
                  background-color: #007BFF;
                  text-decoration: none;
                  border: none;
                  border-radius: 5px;
                  cursor: pointer;
                }
              </style>
            </head>
            <body>
              <p>Olá,</p>
              <p>Seu acesso à Genius foi solicitado.</p>
              <p>Para acessar com a conta <strong>${email}</strong>, clique no botão abaixo:</p>
              <p>
                <a href="https://login.geniusecom.io/finishSignUp/${authKey}/${email}" class="button">Entrar na Genius</a>
              </p>
              <p>Se não foi você que pediu este acesso, por favor, ignore este e-mail.</p>
              <p>Obrigado,</p>
              <br>
              <p>--<br>Equipe Genius Ecom<br><a href="https://login.geniusecom.io">geniusecom.io</a></p>
            </body>
            </html>`,

            `<!DOCTYPE html>
            <html lang="pt-BR">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Email de Login</title>
              <style>
                .button {
                  display: inline-block;
                  padding: 10px 20px;
                  font-size: 16px;
                  color: #ffffff;
                  background-color: #007BFF;
                  text-decoration: none;
                  border: none;
                  border-radius: 5px;
                  cursor: pointer;
                }
              </style>
            </head>
            <body>
              <p>Olá,</p>
              <p>Recebemos uma solicitação de acesso à sua conta Genius.</p>
              <p>Para entrar com a conta <strong>${email}</strong>, clique no botão abaixo:</p>
              <p>
                <a href="https://login.geniusecom.io/finishSignUp/${authKey}/${email}" class="button">Acessar a Genius</a>
              </p>
              <p>Se você não fez esta solicitação, por favor, ignore este e-mail.</p>
              <p>Obrigado,</p>
              <br>
              <p>--<br>Equipe Genius Ecom<br><a href="https://login.geniusecom.io">geniusecom.io</a></p>
            </body>
            </html>`
        ];

        // Escolher título e conteúdo aleatoriamente
        const title = titles[Math.floor(Math.random() * titles.length)];
        const content = contents[Math.floor(Math.random() * contents.length)];

        // Opções do email
        let mailOptions = {
            from: `"Genius Ecom" <${process.env.NEXT_PUBLIC__SMTP_FROM}>`,
            to: email,
            replyTo: process.env.NEXT_PUBLIC__SMTP_FROM,
            subject: title,
            headers: {
                'X-Priority': '1 (Highest)',
                'X-MSMail-Priority': 'High',
                Importance: 'High'
            },
            html: content,
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

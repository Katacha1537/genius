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

        // Opções do email
        let mailOptions = {
            from: `"Genius Ecom" <${process.env.NEXT_PUBLIC__SMTP_FROM}>`,
            to: email,
            replyTo: process.env.NEXT_PUBLIC__SMTP_FROM,
            subject: 'Acesso da Genius!',
            html: `<!DOCTYPE html>\n
            <html lang=\"pt-BR\">\n
            <head>\n
              <meta charset=\"UTF-8\">\n
                <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n
                  <title>Email de Login</title>\n
                    <style>\n
                        .button {\n
                              display: inline-block;\n
                              padding: 10px 20px;\n
                              font-size: 16px;\n      color: white;\n
                              background-color: transparent;\n
                              text-decoration: none;\n
                              border: none;\n
                              border-radius: 5px;\n
                              cursor: pointer;\n
                        }\n
                    </style>\n
            </head>\n
            <body>\n
                <p>Olá,</p>\n
                <p>Recebemos uma solicitação de login na Genius.</p>\n
                <p>Se você quiser fazer login com a conta <strong>${email}</strong>, clique no botão abaixo:</p>\n
                 <p>\n
                    <a href=\"https://login.geniusecom.io/finishSignUp/${authKey}\" class=\"button\">Entrar na Genius</a>\n
                </p>\n
                <p>Caso não tenha solicitado esse link, ignore este e-mail.</p>\n
                <p>Obrigado,</p>\n
                <br><p>--<br>Equipe Genius Ecom<br><a href="https://login.geniusecom.io">geniusecom.io</a></p>\n
            </body>\n
            </html>`,
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

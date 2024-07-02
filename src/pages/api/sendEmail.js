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
      'Confirmação de Acesso à Sua Conta na Genius',
      'Importante: Acesse Sua Conta na Genius Agora',
      'Acesso Seguro: Entre na Sua Conta Genius',
      'Link de Login: Acesso à Sua Conta na Genius',
      'Verificação de Acesso à Conta na Genius',
      'Complete Seu Login na Genius Agora',
      'Instruções de Login: Acesse Sua Conta na Genius',
      'Acesso Autorizado: Entre na Sua Conta Genius',
      'Seu Link de Acesso à Conta na Genius'
    ];

    const contents = [
      `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Acesso à sua conta Genius</title>
  <style>
    .button {
      display: inline-block;
      padding: 10px 20px;
      font-size: 16px;
      color: #ffffff;
      background-color: #28a745;
      text-decoration: none;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <p>Olá,</p>
  <p>Recebemos uma solicitação de acesso à sua conta na Genius.</p>
  <p>Para acessar a conta <strong>${email}</strong>, clique no botão abaixo:</p>
  <p>
    <a href="https://login.geniusecom.io/finishSignUp/${authKey}/${email}" class="button">Acessar Genius</a>
  </p>
  <p>Se você não fez esta solicitação, desconsidere este email.</p>
  <p>Atenciosamente,</p>
  <br>
  <p>Equipe Genius Ecom<br><a href="https://login.geniusecom.io">geniusecom.io</a></p>
</body>
</html>
`,
      `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Acesso à sua conta Genius</title>
  <style>
    .button {
      display: inline-block;
      padding: 10px 20px;
      font-size: 16px;
      color: #ffffff;
      background-color: #28a745;
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
  <p>Para acessar a conta <strong>${email}</strong>, clique no botão abaixo:</p>
  <p>
    <a href="https://login.geniusecom.io/finishSignUp/${authKey}/${email}" class="button">Entrar na Genius</a>
  </p>
  <p>Se você não solicitou este acesso, por favor ignore este email.</p>
  <p>Grato,</p>
  <br>
  <p>Equipe Genius Ecom<br><a href="https://login.geniusecom.io">geniusecom.io</a></p>
</body>
</html>
`
      ,

      `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Acesso à sua conta Genius</title>
  <style>
    .button {
      display: inline-block;
      padding: 10px 20px;
      font-size: 16px;
      color: #ffffff;
      background-color: #28a745;
      text-decoration: none;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <p>Olá,</p>
  <p>Seu pedido de acesso à conta Genius foi recebido.</p>
  <p>Para acessar sua conta <strong>${email}</strong>, clique no botão abaixo:</p>
  <p>
    <a href="https://login.geniusecom.io/finishSignUp/${authKey}/${email}" class="button">Entrar na Genius</a>
  </p>
  <p>Se você não solicitou este acesso, desconsidere esta mensagem.</p>
  <p>Obrigado,</p>
  <br>
  <p>Equipe Genius Ecom<br><a href="https://login.geniusecom.io">geniusecom.io</a></p>
</body>
</html>
`,

      `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aviso de Acesso - Genius</title>
  <style>
    .button {
      display: inline-block;
      padding: 12px 24px;
      font-size: 18px;
      color: #ffffff;
      background-color: #dc3545;
      text-decoration: none;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .button:hover {
      background-color: #c82333;
    }

    .email-content {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333333;
      border: 2px solid #dc3545;
      border-radius: 8px;
    }

    .email-content p {
      margin-bottom: 16px;
    }

    .email-content strong {
      font-weight: bold;
    }

    .footer {
      margin-top: 24px;
      font-size: 14px;
      color: #888888;
    }

    .footer a {
      color: #dc3545;
      text-decoration: none;
    }

    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="email-content">
    <p>Olá,</p>
    <p>Foi solicitado acesso à sua conta na Genius.</p>
    <p>Para acessar sua conta <strong>${email}</strong>, clique no botão abaixo:</p>
    <p>
      <a href="https://login.geniusecom.io/finishSignUp/${authKey}/${email}" class="button">Acessar Conta</a>
    </p>
    <p>Se você não solicitou acesso, por favor, ignore este email.</p>
    <p>Obrigado,</p>
    <br>
    <p>Equipe Genius<br><a href="https://login.geniusecom.io" target="_blank">geniusecom.io</a></p>
    <p class="footer">Este é um email automático. Por favor, não responda a este email diretamente.</p>
  </div>
</body>
</html>
`,

      `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmação de Acesso - Genius Ecom</title>
  <style>
    .button {
      display: inline-block;
      padding: 12px 24px;
      font-size: 18px;
      color: #ffffff;
      background-color: #007bff;
      text-decoration: none;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .button:hover {
      background-color: #0056b3;
    }

    .email-content {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #444444;
    }

    .email-content p {
      margin-bottom: 16px;
    }

    .email-content strong {
      font-weight: bold;
    }

    .footer {
      margin-top: 24px;
      font-size: 14px;
      color: #888888;
    }

    .footer a {
      color: #007bff;
      text-decoration: none;
    }

    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="email-content">
    <p>Olá,</p>
    <p>Recebemos uma solicitação de acesso à sua conta na Genius Ecom.</p>
    <p>Para prosseguir com o acesso à conta <strong>${email}</strong>, clique no botão abaixo:</p>
    <p>
      <a href="https://login.geniusecom.io/finishSignUp/${authKey}/${email}" class="button">Acessar Minha Conta</a>
    </p>
    <p>Se você não fez essa solicitação, por favor, ignore este email.</p>
    <p>Atenciosamente,</p>
    <br>
    <p>Equipe Genius Ecom<br><a href="https://login.geniusecom.io" target="_blank">geniusecom.io</a></p>
    <p class="footer">Este é um email automático. Por favor, não responda a este email diretamente.</p>
  </div>
</body>
</html>
`,
      `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmação de Acesso à Conta - Genius Ecom</title>
  <style>
    .button {
      display: inline-block;
      padding: 12px 24px;
      font-size: 18px;
      color: #ffffff;
      background-color: #6c757d;
      text-decoration: none;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .button:hover {
      background-color: #5a6268;
    }

    .email-content {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Roboto', Arial, sans-serif;
      line-height: 1.6;
      color: #333333;
      background-color: #f8f9fa;
      border: 1px solid #ced4da;
      border-radius: 8px;
    }

    .email-content p {
      margin-bottom: 16px;
    }

    .email-content strong {
      font-weight: bold;
    }

    .footer {
      margin-top: 24px;
      font-size: 14px;
      color: #888888;
    }

    .footer a {
      color: #6c757d;
      text-decoration: none;
    }

    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="email-content">
    <p>Olá,</p>
    <p>Recebemos uma solicitação de acesso à sua conta na Genius Ecom.</p>
    <p>Para acessar a conta <strong>${email}</strong>, clique no botão abaixo:</p>
    <p>
      <a href="https://login.geniusecom.io/finishSignUp/${authKey}/${email}" class="button">Acessar Conta</a>
    </p>
    <p>Se você não fez essa solicitação, por favor, desconsidere este email.</p>
    <p>Obrigado,</p>
    <br>
    <p>Equipe Genius Ecom<br><a href="https://login.geniusecom.io" target="_blank">geniusecom.io</a></p>
    <p class="footer">Este é um email automático. Por favor, não responda a este email diretamente.</p>
  </div>
</body>
</html>
`
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

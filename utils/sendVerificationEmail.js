require('dotenv').config();
const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;

const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.API_SENDINBLUE_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const sendVerificationEmail = (email, verificationCode) => {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  
  sendSmtpEmail.to = [{ email: email }];
  sendSmtpEmail.sender = { name: 'Lash App', email: 'italovarza@gmail.com' };
  sendSmtpEmail.subject = 'Código de Verificação - Lash App';
  sendSmtpEmail.htmlContent = `<p>Seu código de verificação é: <strong>${verificationCode}</strong></p>`;

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log('Email enviado com sucesso:', data);
    },
    function (error) {
      console.error('Erro ao enviar email:', error);
    }
  );
};

module.exports = sendVerificationEmail;

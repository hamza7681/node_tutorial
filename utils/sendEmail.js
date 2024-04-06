const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

const EmailSender = async ({email, subject, heading, text, spanText, url}) => {
  await transporter.sendMail({
    from: process.env.USER_EMAIL,
    to: email,
    subject: subject,
    html: `
    <h3>${heading}</h3>
    <p style="margin-bottom:30px">${text}</p>
    <a href=${url}
      ><span
        style="
          background-color: #5624d0;
          color: white;
          padding: 10px 20px 10px 20px;
        "
        >${spanText}</span
      ></a
    >
    <p style="margin-top:30px">If button does not work, then click below url to reset your password</p>
    <a href=${url} style="color: #5624d0; text-decoration: none"
      >${url}</a
    >
        `,
  });
};

module.exports = EmailSender;

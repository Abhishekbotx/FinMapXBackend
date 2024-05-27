const nodemailer=require('nodemailer');
const {MAIL_HOST,MAIL_USER,MAIL_PASS}=require('../config/dotenvConfig')
const mailsender = async (email, title, body) => {
  try {
      const transport = nodemailer.createTransport({
          host: MAIL_HOST,
          auth: {
              user: MAIL_USER,
              pass: MAIL_PASS
          },
      });

      const info = await transport.sendMail({
          from: `FINMAP <noreply@gmail.com>`,
          to:`${email}`,
          subject: `${title}`,
          html: `${body}`,
      });

      return info;
  } catch (e) {
      console.log(e.message);
  }
}

module.exports=mailsender;
import nodemailer from 'nodemailer';
import dotenv from "dotenv"

dotenv.config();

export const sendEmail = async (
  to: string,
  subject: string,
  html: string
): Promise<{ status: 'success' | 'error'; message: string }> => {
  console.log('to:', to, 'from:', process.env.companyGmail);

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.companyGmail,
        pass: process.env.GmailAppPassword,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.companyGmail,
      to,
      subject,
      text: 'This E-mail is from PIXXI',
      html,
    });

    // console.log("yoooooooooooooooo",info)

    if (info.accepted.length > 0) {
      return {
        status: 'success',
        message: `Email successfully sent to ${to}`,
      };
    } 
    else {
      return {
        status: 'error',
        message: `Email not accepted by the server for ${to}`,
      };
    }
  } 
  catch (err: any) {
    // console.error('Email sending error:', err);
    return {
      status: 'error',
      message: `Failed to send email: ${err.message}`,
    };
  }
};











// import nodemailer from 'nodemailer';
// import config from '../config';

// export const sendEmail = async (to: string, subject: string, html: string) => {
//   console.log("toooooooo",to,"from",config.companyGmail)
//   try {
//     const transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: 587,
//       secure: false, // true for port 465, false for other ports
//       auth: {
//         user: `${config.companyGmail}`,
//         pass: `${config.GmailAppPassword}`,
//       },
//     });
//     // send mail with defined transport object
//     const info = await transporter.sendMail({
//       from: `${config.companyGmail}`, // sender address
//       to, // list of receivers
//       subject, // Subject line
//       text: 'This E-mail is from Golpo Griho', // plain text body
//       html, // html body
//     });

//     // console.log('Message sent: %s', info.messageId,"info is", info);
//   } catch (err) {
//     console.log(err);
//     throw Error('fasiled to send E-mail');
//   }
// };
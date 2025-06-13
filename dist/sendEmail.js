"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sendEmail = (to, subject, html) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('to:', to, 'from:', process.env.companyGmail);
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: process.env.companyGmail,
                pass: process.env.GmailAppPassword,
            },
        });
        const info = yield transporter.sendMail({
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
    catch (err) {
        // console.error('Email sending error:', err);
        return {
            status: 'error',
            message: `Failed to send email: ${err.message}`,
        };
    }
});
exports.sendEmail = sendEmail;
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

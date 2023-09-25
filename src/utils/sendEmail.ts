// import nodemailer, { Transporter } from 'nodemailer';
// import { PrepareMailDataType, SendMailDataType } from '../helpers/types';
// import { configs } from '../config';

// const sendEmail = async (data: SendMailDataType) => {
//   try {
//     const transporter: Transporter = nodemailer.createTransport({
//       host: configs.HOST || 'smtp-pulse.com',
//        //service: configs.SERVICE,
//       port:  587,
//       secure: false,
//       auth: {
//         user: configs.USER,
//         pass: configs.PASS,
//       },
//       tls: {
//         ciphers: "SSLv3",
//       },
    
//     });

//     const msg = {
//       from: `${data.senderName} <${data.senderEmail}>`,
//       to: data.mailRecipients,
//       subject: data.mailSubject,
//       html: data.mailBody,
//     };

//     await transporter.sendMail(msg);
//     console.log('Email sent successfully');
//   } catch (error) {
//     console.log('Failed to send email');
//     console.log(error);
//     return { status: 'error', message: 'Failed to send email' };
//   }

//   return { status: 'success', message: 'Email sent successfully' };
// };

// export default sendEmail;

// export const prepareMail = async ({
//   mailRecipients,
//   mailSubject,
//   mailBody,
//   senderName,
//   senderEmail,
// }: PrepareMailDataType) => {
//   const _sendMail: any = await sendEmail({
//     senderName,
//     senderEmail,
//     mailRecipients,
//     mailSubject,
//     mailBody,
//   });
//   return { status: 'error', message: 'Failed to send email' };
// };

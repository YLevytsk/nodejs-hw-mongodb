import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: +process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendResetPasswordEmail = async (to, link) => {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to,
    subject: "Reset your password",
    html: `<p>Click the link below to reset your password:</p>
           <a href="${link}">${link}</a>`,
  };

  await transporter.sendMail(mailOptions);
};


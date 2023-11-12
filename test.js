const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  pool: true,
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: "The1111mp@outlook.com",
    pass: "fjuoyqyowzhxsehu",
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("email is ready");
  }
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"The1111mp" <The1111mp@outlook.com>', // sender address
    to: "The1111mp@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

main().catch(console.error);

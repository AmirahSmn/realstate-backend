const nodemailer = require("nodemailer");

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "xyz@gmail.com",
    pass: "*************",
  },
});

let mailDetails = {
  from: "xyz@gmail.com",
  to: "abc@gmail.com",
  subject: "Test mail",
  text: "Node.js testing mail for GeeksforGeeks",
};

module.exports = mailTransporter;

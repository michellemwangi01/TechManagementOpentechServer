const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

// Function to send email notification
async function sendEmailNotification(emailInfo) {
  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MAIL_ACCOUNT,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  // Define email options
  const mailOptions = {
    from: process.env.MAIL_ACCOUNT,
    to: emailInfo.clientEmail,
    subject: `New Task Created RefNo.${emailInfo.refNumber}`,
    text: `Dear ${emailInfo.clientName},
    
    We have created your task with the following information: 

      Reference Number: ${emailInfo.refNumber}
      Assigned to: ${emailInfo.assigned_to}
      Category: ${emailInfo.category}
      Status: ${emailInfo.status}
      Description: ${emailInfo.description}
    
    Please let us know if you have any questions or concerns.

    Best regards,
    OpenTech Global Services Limited`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error occurred:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

module.exports = sendEmailNotification;

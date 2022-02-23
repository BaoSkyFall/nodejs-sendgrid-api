require('dotenv').config();
const path = require('path');
const sgMail = require('@sendgrid/mail');
const express = require('express')
const cors = require('cors')
const app = express();
app.use(cors());
sgMail.setApiKey('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');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.route("/").get(function (req, res) {
   res.sendFile(path.join(__dirname, '/form.html'));
});
app.post('/contact',cors(), (req, res) => {
    console.log(req);
    const msg = {
        to: `harrykill.007@gmail.com`, // Change to your recipient
        from: 'baoit128@gmail.com', // Change to your verified sender
        subject: req.body.subject,
        text: `Message from ${req.body.email}:\n${req.body.message}`,
    }
    try {
        sgMail.send(msg);
        res.send("Message Successfully Sent!");
      } catch (error) {
        res.send("Message Could not be Sent");
      }
 });
app.listen(3000, () => { console.log(`Listening on port 3000`); });
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
   res.send("OK Loaded")
});
app.post('/contact',cors(), (req, res) => {
    console.log(req);
    const msg = {
        to: `harrykill.007@gmail.com`, // Change to your recipient
        from: 'baoit128@gmail.com', // Change to your verified sender
        subject: 'Subject Test',
        template_id:'d-669eb6b3423f45b4948da943bc1edc8c',
        dynamic_template_data:{
            "name":"Quoc Bao",
            "email":"baoit128@gmail.com",
            "phoneNumber": "0938443767",
            "subject":"Toys",
            "message":"Lorem Ipsum is simply dummy text of the printing and typesetting industry"
            
           }
    }
    try {
        console.log('start send')
        sgMail.send(msg);
        res.send("Message Successfully Sent!");
      } catch (error) {
        res.send("Message Could not be Sent");
      }
 });
app.listen(3000, () => { console.log(`Listening on port 3000`); });
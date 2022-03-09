const path = require('path');
const sgMail = require('@sendgrid/mail');
const express = require('express')
const cors = require('cors')
const app = express();

sgMail.setApiKey('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');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(cors({
    origin: '*'
  }));
app.route("/").get(function (req, res) {
   res.send("OK Loaded")
});
app.post('/contact', (req, res) => {
    data = req.body;
    const msg = {
        to: `sales@dpig-logisticts.com`, // Change to your recipient
        from: 'ops@dpig-logisticts.com', // Change to your verified sender
        subject: 'Information ',
        template_id:'d-669eb6b3423f45b4948da943bc1edc8c',
        dynamic_template_data:{
            "name":data.name,
            "email":data.email,
            "phoneNumber": data.phoneNumber,
            "subject":data.subject,
            "message":data.message
           }
    }
    try {
        console.log('start send',msg)
        sgMail.send(msg);
        res.send("Message Successfully Sent!");
      } catch (error) {
        res.send("Message Could not be Sent");
      }
 });
app.listen(3000, () => { console.log(`Listening on port 3000`); });
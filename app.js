const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const ejs = require('ejs');
const nodemailer = require('nodemailer');


const app = express();

//view engine
// app.engine('handlebars', exphbs());
app.set('view engine', 'ejs');

//static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

//body parser middleware
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.render('contact')
});

app.post('/send', (req, res) => {
    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Company: ${req.body.company}</li>
            <li>Email: ${req.body.email}</li>
            <li>Phone: ${req.body.phone}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `;

    // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "premium85.web-hosting.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "contact@xtrememedia.com.ng", // generated ethereal user
      pass: "08168496216@AJIE", // generated ethereal password
    },
    // tls:{
    //     rejectUnauthorize:false
    // }
  });

  // send mail with defined transport object
  let mailOptions = {
    from: '"Xtreme Contact Form" <contact@xtrememedia.com.ng>', // sender address
    to: "nkimajie2@gmail.com", // list of receivers
    subject: "Node Contact Request", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if(error){
          return console.log(error);
      }
  
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
 
  res.render('contact', {msg: 'Email has been sent'}); 
});
});

app.listen(3000, () => console.log('Server started on http://localhost:3000'));
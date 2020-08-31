var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

var urlencodedParser = bodyParser.urlencoded({extended:false});

//was going to sanitize user input but considering no response that's executed, no risk of XSS
//Yes I am aware hardcoding api credentials is a security risk...
const oauth2Client = new OAuth2(
	"#######################################################",
	"#######################################################",
	"#######################################################"
);

oauth2Client.setCredentials({
	refresh_token:"##############################################################################################################"
});
const accessToken = oauth2Client.getAccessToken()


app.get('/', function(req,res) {
        res.sendFile(path.join(__dirname + '/contact.html'));
});


app.post('/',urlencodedParser, function(req,res){
	var mailOptions = {
        	from:'#######################################################',
        	to: '#######################################################',
       		subject:'New Inquiry from Contact Page!',
        	text:"From:"+req.body.email+" Phone:"+req.body.phone+" Inquiry:"+req.body.inquiry
	};
	transporter.sendMail(mailOptions,function(error,info){
        if(error){
                console.log(error);
        }else{
                console.log("success!");
        }
     });
     res.sendFile(path.join(__dirname + '/submitted.html'));
});

var transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
                type:"OAuth2",
		user: "#######################################################",
		clientId: "#######################################################",
		clientSecret:"#######################################################",
		refreshToken: "#######################################################",
		accessToken: accessToken
        }
});

app.listen(8080);





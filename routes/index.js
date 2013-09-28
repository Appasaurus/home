var valid_email = function(emailAddress) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(emailAddress);
};

function send_contact_form(emailAddress) {
    var globals = require('./config.js');
    var nodemailer = require("nodemailer");

    console.log(globals.SMTP_HOST);
    var transport = nodemailer.createTransport("SMTP", {
	host: globals.SMTP_HOST,
	secureConnection: false,
	port: 587,
	auth: {
            user: globals.SMTP_USERNAME,
            pass: globals.SMTP_PASSWORD
	}
    });

    var mailOptions = {
	from: "Appasaurus <noreply@appasaur.us>",
	to: globals.TEAM_EMAIL, 
	subject: "Website Inquiry",
	html: "<p>From: "+emailAddress+"</p><p>Please follow up with this person.</p>"
    };

    var sent = true;
    transport.sendMail(mailOptions, function(error, response) {
	if(error) {
            sent = false;
	    console.log(error);
	} else {
            console.log("Message sent: " + response.message);
	}
    });

    transport.close();
    return sent;
}


var send_contactRequest = function(emailAddress) {
    send_contact_form(emailAddress);
};

var send_confirmation = function(emailAddress) {
    console.log('Sent confirmation email to client');
};

exports.index = function(req, res) {
    res.render('index', {title: 'Appasaurus'});
};

exports.contactRequest = function(req, res){
    var emailAddress = req.param('email');
    
    if(valid_email(emailAddress)) {
	send_confirmation(emailAddress); // send email to client
	send_contactRequest(emailAddress); // send email to team member
	res.send(200, 'OK');
    } else {
	res.send(500, 'Invalid e-mail address');
    }
};

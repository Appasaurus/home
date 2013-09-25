var valid_email = function(emailAddress) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(emailAddress);
};

var send_contactRequest = function(emailAddress) {
    console.log('Sent contact request to team');
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

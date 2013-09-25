/* Appasaurus: Hear us ROAR.
   jQuery form mailer script
   Copyright (C) 2013 Appasaur.us */

var email_success = function(data) {
    $('div.failure').fadeOut();
    $('.controls').fadeOut();
    $('.success').fadeIn();
};

var email_failure = function(jqHXR) {
    $('div.failure').fadeIn();
    $('.txtEmail').addClass('failure');
};

$('.btnSend').click(function() {
    var emailAddress = $('.txtEmail').val();

    // validate email and send reply
    $.ajax({
        url: '/contactRequest',
        type: 'POST',
        data: {email: emailAddress},
        success: function(data){
            email_success(data);
        },
        error: function(jqXHR) {
            email_failure(jqXHR);
        }
    });
});

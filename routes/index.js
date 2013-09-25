
exports.index = function(req, res) {
    res.render('index', {title: 'Appasaurus'});
};

exports.contactRequest = function(req, res){
    res.send(500, 'something wrong');
};

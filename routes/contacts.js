exports.index = function(req, res){
	config = require('../config');
	scripts = config.get('scripts');
	styles = config.get('styles');
	res.render('contacts',{
	styles: styles,
	scripts: scripts
	});
}


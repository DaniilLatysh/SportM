exports.index = function(req, res){
	config = require('../config');
	scripts = config.get('scripts');
	styles = config.get('styles');
	res.render('gallery',{
	styles: styles,
	scripts: scripts
	});
}


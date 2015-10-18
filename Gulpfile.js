var gulp = require("gulp");
var elixir = require('laravel-elixir');

var paths = {
	'jquery': './bower_components/jquery/',
	'bootstrap': "./bower_components/bootstrap-sass/assets/",
	'fontawesome' : "./bower_components/font-awesome/"
}

elixir(function(mix) {
	mix.sass(['main.scss', paths.fontawesome + 'scss/font-awesome.scss'], 'public/css', {includePaths: [paths.bootstrap + 'stylesheets/']})

	.copy(paths.bootstrap + 'fonts/bootstrap/**', 'public/fonts/bootstrap')
	.copy(paths.fontawesome + 'fonts/**', 'public/fonts')
	.scripts([
		paths.jquery + "dist/jquery.js",
		paths.bootstrap + "javascripts/bootstrap.js",
		'./resources/assets/js/main.js'
	], 'public/js/app.js',  './');
	
});


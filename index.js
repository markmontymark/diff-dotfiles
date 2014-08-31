#!/usr/bin/env node

"use strict";

var fs = require('fs');
var walk = require('walk');
var spawn = require('child_process').spawn;
var argv = require('yargs')
	.usage("Recursive diff where we only descend into first directory")
	.example('$0 path/to/dirA path/to/dirB')
	.demand(2)
	.describe('Need two directories as input')
	.argv;

var dir_a = argv._[0];
var dir_b = argv._[1];

var walker = walk.walk(dir_a, {
	followLinks: false,
	// directories with these names will be skipped
	filters: ['.git','node_modules']
});

walker.on('file', function(root, fileStats, next){
	var path = root + '/' + fileStats.name;
	var other_path = path.replace(root,dir_b);
	fs.exists(other_path,function(exists){
		if( ! exists ){
			console.error("Only in "  + root +": " + fileStats.name);
			return;
		}
		spawn('diff',['-w',path, path.replace(root,dir_b)]);
	});
	next();
});

walker.on('errors', function(root, stat, next) {
	console.error('errors in ',root, ' ', stat);
	next();
});

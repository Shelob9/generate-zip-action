console.log('Hi Roy');
var ncp = require('ncp').ncp;
const rimraf = require( 'rimraf' );
ncp.limit = 16;
const source =  __dirname + '/fixture';
const resultPath = __dirname + '/result';
const zipPath = __dirname + '/result.zip';
const zipFolder = require('zip-folder');

rimraf(resultPath, () => {
	const excludes = require( './excludes' );
	const options = {
		filter: (filePath) => {
			const fileName = filePath.substring(source.length);
			return -1 === excludes.indexOf(fileName);
		}
	}; //https://www.npmjs.com/package/ncp#programmatic-usage
	ncp(source, resultPath, options, function (err) {
		if (err) {
			return console.error('ERROR!');
		}
		console.log('Directory created!');
		rimraf(zipPath, () => {
			zipFolder(resultPath, zipPath, function(err) {
				if(err) {
					console.log('Zip Error', err);
				} else {
					console.log('Zip Created');
				}
			});


		});
	});
});




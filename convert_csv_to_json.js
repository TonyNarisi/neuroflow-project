const fs = require('fs');
const parse = require('csv-parse');

const filenames = ['future_stress', 'mood', 'rumination', 'sleep'];
const startDir = './subjective_metrics/';
const targetDir = './src/client/app/data/';
const parserOptions = {
	delimiter: ',',
	columns: [
		'timestamp',
		'rating'
	]
}

const convertToJson = () => {
	for (let fileNum = filenames.length, i = 0; i < fileNum; i++) {
		let parser = parse(parserOptions, (err, data) => {
			if (err) console.error(err);
			fs.writeFile(`${ targetDir }${ filenames[i] }.json`, JSON.stringify(data), err => {
				if (err) console.error(err);
				console.log(`wrote ${ filenames[i] }`);
			})
		})
		fs.createReadStream(`${ startDir }${ filenames[i] }.csv`).pipe(parser);
	}
}

convertToJson();
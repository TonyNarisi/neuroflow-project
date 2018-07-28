export const prettyPrint = (str) => {
	return str.split('_').map(word => {
		return word.slice(0,1).toUpperCase() + word.slice(1);
	}).join(' ');
}
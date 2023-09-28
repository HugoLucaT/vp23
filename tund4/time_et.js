 exports.timeETformated = function(){
	let timeNow = new Date();
	let timeET = (timeNow.getHours()) + " tundi " + (timeNow.getMinutes()) + " minutit " + (timeNow.getSeconds()) + " sekundit.";
	return timeET;
}
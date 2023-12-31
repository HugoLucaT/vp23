const monthNamesET = ["jaanuar", "veebruar", "märts", "april", "mai", "juuni",
	 "juuli", "august", "september", "oktoober", "novemeber", "detsember"];

const dateETformated = function(){
	let timeNow = new Date();
	//console.log(timeNow)
	let dateNow =  timeNow.getDate();
	let monthNow = timeNow.getMonth();
	let yearNow = timeNow.getFullYear();
	//let dateET = dateNow + "." + (monthNow + 1) + "." + yearNow;
	let dateET = dateNow + ". " + monthNamesET[monthNow] + " " + yearNow;
	return dateET;
}

const dateENformated = function(){
	let timeNow = new Date();
	//console.log(timeNow)
	let dateNow =  timeNow.getDate();
	let monthNow = timeNow.getMonth();
	let yearNow = timeNow.getFullYear();
	let dateEN = (monthNow + 1) + "/" + dateNow  + "/" + yearNow;
	return dateEN;
}

const timeETformated = function(){
	let timeNow = new Date();
	let timeET = (timeNow.getHours()) + " tundi " + (timeNow.getMinutes()) + " minutit " + (timeNow.getSeconds()) + " sekundit.";
	return timeET;
}

const timeOfDayET = function(){
	let partOfDay = "suvaline hetk";
	let hourNow  = new Date().getHours();
	if(hourNow >= 6 && hourNow < 12){
		partOfDay = "hommik.";
	}
	if(hourNow >= 14 && hourNow < 18){
		partOfDay = "pärastlõuna.";
	}
	if(hourNow >= 18){
		partOfDay = "õhtu.";
	}
	return partOfDay;
}

//ekspordin all
module.exports = {dateETformated: dateETformated, timeETformated: timeETformated, timeOfDayET:timeOfDayET, monthsET:monthNamesET, dateENformated: dateENformated};

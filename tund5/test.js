const firstName = "Hugo Luca";
const lastName = "Tigane";
const datetimeValue = require("./datetime_et");
const fs = require("fs");



/*const listOfPeople = function(callback) {
	let abc = "''"
	fs.readFile("public/namelog.txt", "utf8", (err, data)=>{
		if(err){
			console.log(err);
			let abc = "''";
			callback(abc);
		}
		else {
			//console.log(data);
			//folkWisdom = data;
			//console.log(calculation(data));
			let abc = calculation(data);
			console.log(abc);
			callback(abc);
		}
	});
}*/


const initialData = fs.readFileSync("public/namelog.txt", "utf8");


const calculation = function() {
	let tabledFileBegin = initialData.split(';');
	//console.log(tabledFileBegin);
	let tabledFile = [];
	let i = 0;
	let writenCode = "";
	for (let line of tabledFileBegin){
		let innerList = line.split(',');
		tabledFile.push(innerList);
		//console.log(tabledFile);
		//console.log(tabledFileBegin);
		writenCode += ('<tr><td>' + tabledFile[i][0] + '</td><td>' + tabledFile[i][1] + '</td><td>' + tabledFile[i][2] + '</td></tr>');
		i++;
	}
	//console.log(writenCode);
	//writenCode += "";
	return writenCode;
}

//console.log(calculation())

//console.log(listOfPeople());
/*const nameTableFile = function(nameInfo){
	//console.log('nameinfo' + nameInfo);
	let tabledFileBegin = nameInfo.split(';');
	//console.log(tabledFileBegin);
	let copium = '';
	let tabledFile = [];
	let i = 0
	copium = ''
	for (let line of tabledFileBegin){
		let innerList = line.split(',')
		tabledFile.push(innerList);
		//console.log(tabledFile);
		//console.log(tabledFileBegin);
		copium += ('<tr><td>' + tabledFile[i][0] + '</td><td>' + tabledFile[i][1] + '</td><td>' + tabledFile[i][2] + '</td></tr>');
		//console.log(copium);
		i++
	}
	return copium;
}*/

/*listOfPeople((err, result) => {
    if (err) {
        // Handle error
    } else {
        // Use the result here
        //console.log(result);
    }
});*/

/*const tryingSomethn = listOfPeople((err, result) => {
    if (err) {
        throw err;
    } 
	else {
        let potensialCode = result;
        //console.log(result);
		console.log(potensialCode);
    }
});*/

module.exports = {calculation: calculation};
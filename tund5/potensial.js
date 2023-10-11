const fs = require ("fs");
/*const listOfPeople = require('./test'); 
let potensialCode; 

listOfPeople.listOfPeople((err, result) => {
    if (err) {
        throw err;
    } else {
        potensialCode = result;
        console.log(potensialCode);
    }
});

module.exports = potensialCode; */

/*function listOfPeople() {
    fs.readFile("public/namelog.txt", "utf8", (err, data) => {
        if (err) {
            console.error(err);
        }

        const tableHTML = createTableHTML(data);
		console.log(tableHTML);
        return(null, tableHTML);
		
    });
}

function createTableHTML(nameInfo) {
    const tabledFileBegin = nameInfo.split(';');
    
    const tableRows = tabledFileBegin.map((line) => {
        const innerList = line.split(',');
        return `<tr><td>${innerList[0]}</td><td>${innerList[1]}</td><td>${innerList[2]}</td></tr>`;
    });

    const tableHTML = `<table border="1"><tr><th>Eesnimi</th><th>Perekonnanimi</th><th>Kuupäev</th></tr>${tableRows.join('')}</table>`;
    
    return tableHTML;
}
*/

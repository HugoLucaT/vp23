const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const dateTimeValue = require("./datetime_et");
const querystring = require('querystring');

const pageHead = '<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset="utf-8">\n<title>Hugo</title>\n</head>\n<body>\n';
const pageBanner = '\t<img src="banner.png" alt="Veebiprogrameerimise kursuse bänner">\n';
const pageBody = '<h1>Hugo Luca</h1><p>See veebileht on valminud <a href="https://www.tlu.ee" target="_blank">TLÜ-s</a>.</p>\n';
const pageFoot = '\t<hr>\n</body>\n</html>';



http.createServer(function(req, res){
	let currentURL = url.parse(req.url, true);
	//console.log(currentURL);
	if(req.method === 'POST'){
		/*let rawData = '';
		req.on('data', chunk => {
			rawData += chunk.toString
		});
		req.on('end', () => {
			let finalData = rawData.toString
			let parsedData = querystring.decode(rawData)
			res.end(parsedData)
		});*/
		collectRequestData(req, result => {
            console.log(result);
			//kirjutame andmed tekstifaili
			fs.open('public/namelog.txt', 'a', (err, file)=>{
				if (err){
					throw err
				}
				else {
					fs.appendFile('public/namelog.txt', result.firstNameInput + ',' + result.lastNameInput + ';', (err)=>{
						if (err){
							throw err;
						}
						else{
							console.log('Edukas')
						}
					});
				}
				fs.close(file, (err)=>{
						if (err){
							throw err;
						}
					});
			});
			res.end(result.firstNameInput);
		});
	}
	else if (currentURL.pathname === "/"){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		res.write('<p>Kell veebilehe avamisel oli: ' + dateTimeValue.timeETformated() + '<\p>');
		res.write('\n\t<hr>\n\t<p><a href="addname">Lisa oma nimi!</a>!</p>');
		res.write('\n\t<hr>\n\t<p><a href="semesterprogress">Semestriprogress</a>!</p>');
		res.write('\n\t<hr>\n\t<p><a href="TLUpilt">Leht, kus näidatakse üht (Minu valitud) fotot Tallinna Ülikoolist</a>!</p>');
		res.write(pageFoot);
		//console.log("Keegi Vaatab!");
		//valmis, saada ära
		return res.end();
	}
	else if (currentURL.pathname === "/addname"){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		res.write('\n\t<hr>\n\t<h2>Lisa palun oma nimi</h2>');
		res.write('\n\t<hr>\n\t<p><form method = "POST"><label for ="firstNameInput">Eesnimi: </label><input type="text" name="firstNameInput" id="firstNameInput" placeholder ="Sinu eesnimi ..."><br><label for ="lastNameInput">Perekonnanimi: </label><input type="text" name="lastNameInput" id="lastNameInput" placeholder ="Sinu perekonnanimi ..."><br><input type="submit" name="nameSubmit" value="Salvesta"></form></p>');
		res.write('\n\t<hr>\n\t<p><a href="..">Tagasi algusesse!</a></p>');
		res.write(pageFoot);
		//console.log("Keegi Vaatab!");
		//valmis, saada ära
		return res.end();
	}	
	else if (currentURL.pathname === "/semesterprogress"){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		const semBegin = new Date('08/28/2023');
		const semEnd = new Date('01/28/2024');
		const sem = new Date();
		const semLeft = Math.round((sem - semBegin) / (1000 * 60 * 60 * 24))
		if (semBegin > sem){
			res.write('\n\t<hr>\n\t<p>2023/2024 õppeaasta sügissemester pole veel peale hakanud.</p>');
		}
		else if (semBegin < sem && semEnd > sem){
			res.write('\n\t<hr>\n\t<p>Semester on kestnud ' + semLeft + ' paeva</p>')
		}
		else if (semEnd < sem){
			res.write('\n\t<hr>\n\t<p>Semester on läbi!</p>');
		}
		const totalSem = Math.round((semEnd - semBegin) / (1000 * 60 * 60 * 24))
		res.write('<meter min="0" max="' + totalSem + '" value="' + semLeft+ '"></meter>');
		res.write(pageFoot);
		return res.end();
	}
	else if (currentURL.pathname === "/TLUpilt"){
		//loeme kataloogist fotode nimekirja ja loosime pildi
		let htmlOutput = '\n\t<p>Pilti ei saa näidata!<\p>';
		fs.readdir('public/tluphotos', (err, fileList)=>{
			if (err){
				throw err;
				fileList = 0
				tluPhotoPage(res, htmlOutput);
			}
			else {
				let tluPhotoFiles = fileList
				let photoNum = Math.floor(Math.random() * fileList.length);
				console.log(photoNum)
				htmlOutput = '\n\t<img src="' + fileList[photoNum] + '" alt="TLU pilt">';
				tluPhotoPage(res, htmlOutput);
				res.write('<ul>');
				for (let i = 0;i < tluPhotoFiles.length;  i ++){
					res.write('<li>' + fileList[i] + '</li>');
				}
				res.write('</ul>');
				res.write(pageFoot);
				return res.end();
			}
		});
		
	}
	//else if (currentURL.pathname === "/tlu_42.jpg"){
	else if (path.extname(currentURL.pathname) === ".jpg"){
		console.log(path.extname(currentURL.pathname));
		let bannerPath = path.join(__dirname, "public", "tluphotos");
		fs.readFile(bannerPath + currentURL.pathname, (err, data)=>{
			if (err){
				throw err;
			}
			else if (data) {
				console.log(currentURL.pathname);
				res.writeHead(200, {"Content-Type": "image/jpeg"});
				res.write(data);
				res.end();
			}
		});
	}
	else if (currentURL.pathname === "/banner.png"){
		console.log("Tahame Pilti!");
		let bannerPath = path.join(__dirname, "public", "banner");
		
		fs.readFile(bannerPath + currentURL.pathname, (err, data)=>{
			if (err){
				throw err;
			}
			else if (data) {
				console.log(bannerPath + currentURL.pathname);
				res.writeHead(200, {"Content-Type": "image/png"});
				res.write(data);
				res.end();
			}
		});
	}
	else {
		res.end("Error 404");
	}
}).listen(5104);


function tluPhotoPage(res, htmlOutput){
	res.writeHead(200, {"Content-type": "text/html"});
	res.write(pageHead);
	res.write(pageBanner);
	res.write(pageBody);
	res.write(htmlOutput);
	console.log(htmlOutput);
	//res.write('\t<img src="/tlu_42.jpg" alt="Pilt TLU-st">\n');
	
}

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let receivedData = '';
        request.on('data', chunk => {
            receivedData += chunk.toString();
        });
        request.on('end', () => {
            callback(querystring.decode(receivedData));
        });
    }
    else {
        callback(null);
    }
}
//rinde   5100

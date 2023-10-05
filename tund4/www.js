const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const pageHead = '<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset="utf-8">\n<title>Hugo</title>\n</head>\n<body>\n';
const pageBanner = '\t<img src="banner.png" alt="Veebiprogrameerimise kursuse bänner">\n';
const pageBody = '<h1>Hugo Luca</h1><p>See veebileht on valminud <a href="https://www.tlu.ee" target="_blank">TLÜ-s</a>.</p>\n';
const pageFoot = '\t<hr>\n</body>\n</html>';
const dateTimeValue = require("./datetime_et");


http.createServer(function(req, res){
	let currentURL = url.parse(req.url, true);
	//console.log(currentURL);
	if (currentURL.pathname === "/"){
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
		res.write('\n\t<hr>\n\t<p>Edaspidi on siin asjad</p>');
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
		res.write('<meter min="0" max="totalSem" value="semLeft"></meter>');
		res.write('\n\t<hr>\n\t<p>Edaspidi on siin asjad</p>');
		res.write(pageFoot);
		return res.end();
	}
	else if (currentURL.pathname === "/TLUpilt"){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageHead);
		res.write(pageBanner);
		res.write(pageBody);
		res.write('\t<img src="/tlu_42.png" alt="Pilt TLU-st">\n');
		res.write(pageFoot);
		//console.log("Keegi Vaatab!");
		//valmis, saada ära
		return res.end();
	}
	else if (currentURL.pathname === "/tlu_42.png"){
		let bannerPath = path.join(__dirname, "public", "tluphotos");
		fs.readFile(bannerPath + currentURL.pathname, (err, data)=>{
			if (err){
				throw err;
			}
			else if (data) {
				console.log(currentURL.pathname);
				res.writeHead(200, {"Content-Type": "image/png"});
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

//rinde   5100

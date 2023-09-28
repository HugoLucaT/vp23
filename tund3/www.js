const http = require("http");

http.createServer(function(req, res){
	res.writeHead(200, {"Content-type": "text/html"});
	res.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Hugo</title></head><body>');
	res.write('<h1>Hugo Luca</h1><p>See veebileht on valminud <a href="https://www.tlu.ee" target="_blank">TLÜ-s</a>.</p>');
	res.write('<hr></body></html>');
	console.log("Keegi Vaatab!");
	//valmis, saada ära
	return res.end();
}).listen(5104);

//rinde   5100

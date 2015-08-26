var http = require("http");

function creatTable (a) {
	/*Logic*/
	var i = 0;
	var count = 1;
	var up = 0, down = a - 1, left = 0, right = a - 1;
	/*creat 2d array*/
	var table = new Array();
	for (i = 0; i < a; i++) {
		table[i] = new Array(a);
			};
	/*put numbers*/
	while(up < down && left < right){
	/*up line*/
		for (i = left; i < right; i++) {
			table[up][i] = count;
			count++;
		};
					
	/*right line*/
		for (i = up; i < down; i++) {
			table[i][right] = count;
			count++;
		};

	/*down line*/
		for (i = right; i > left; i--) {
			table[down][i] = count;
			count++;
		};
					
	/*left line*/
		for (i = down; i > up; i--) {
			table[i][left] = count;
			count++;
		};
		up++;
		right--;
		down--;
		left++;
	};
	if (a % 2 != 0) {
		table[(a - 1) / 2][(a - 1) / 2] = count;
	};
	console.log("a="+a);
	for (i = 0; i < a; i++) {
		console.log(table[i]);
		table[i][a - 1] = table[i][a - 1] + "\n";
	};
	return table;
}

function onRequest(request, response) {
	var sptable = creatTable();
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("<html><head></head><body><input id='dim'><button>Submit</button></body></html>");
	// response.writeHead(200, {"Content-Type": "text/plain"});
	// response.write(sptable + '');
	response.end();
}

http.createServer(onRequest).listen(8888);


console.log("I am live ...");
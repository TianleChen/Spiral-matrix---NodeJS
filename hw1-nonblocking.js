var querystring = require("querystring");

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
	for (i = 1; i < a; i++) {
		console.log(table[i]);
		table[i][0] = "\n" + table[i][0];
	};
	return table;
}

function start(response, postData) {
	console.log("----------------Start-----------------");
	var body = '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" content="text/html; '+
		'charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		'<form action="/upload" method="post">'+
		'<textarea name="text" rows="1" cols="6" placeholder="number"></textarea>'+
		'<input type="submit" value="Submit text"/>'+
		'</form>'+
		'</body>'+
		'</html>';
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

function upload(response, postData) {
	console.log("----------------Upload----------------");
	response.writeHead(200, {"Content-Type": "text/plain"});
	var num_text = querystring.parse(postData).text;
	var num = Number(num_text);
	var sptable = creatTable(num);

	response.writeHead(200, {"Content-Type": "text/html"});
	var i, j;
	response.write('<html><head></head><body><table border="1">')
	for (i = 0; i < num; i++) {
		if(i%2){
			response.write('<tr bgcolor="#EEE">');
		}
		for (j = 0; j < num; j++) {
			response.write('<td>' + sptable[i][j] + " " + '</td>');
		};
		response.write('</tr>');
	};
	response.write('</table><br><form action="/"><button>Back</button></form></body></html>');
	response.end();
}

exports.start = start;
exports.upload = upload;


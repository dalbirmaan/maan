
var net = require('net');

var sockets = [];
var names =[];

var s = net.createServer( function(socket ){



	
	console.log("connected by "+ socket.remoteAddress);
	socket.write("Your name please : ");
	socket.on('data', function(name){
		var n = name.toString().substring(0,name.length-2);
		socket.write(n + " Welcome to Chat !!\r\n");
 		sockets.push(socket);
		names.push(name.toString().substring(0, name.toString().length-2));
		console.log(names +  sockets);
		sockets.forEach(function(sock){
			if(sock != socket) sock.write(name+" Joined chat");
			socket.on('data', function(data){
				console.log(data.toString());
				sockets.forEach(function(sock){
				if(sock != socket) sock.write(names[sockets.indexOf(socket)]+" > "+data.toString());
				
			});
		});

	});

	socket.on('close', function(data){
		console.log("Connection terminated from " + socket.remoteAddress);
		var i = sockets.indexOf(socket);
		sockets.splice(i);
		names.splice(i);
	});
	});
});

s.listen(2323);

console.log("Chat server listening on port 2323");


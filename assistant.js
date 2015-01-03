var net = require('net');
//var PORT = 6969;

net.createServer(function(sock) {
    
    console.log('CONNECTED: '+sock.remoteAddress +':'+ sock.remotePort);
    sock.setEncoding('utf8');
    sock.on('data', function(data) {
        
        console.log('DATA ' + sock.remoteAddress + ':'+ data);

	switch(data.toString().substring(0,data.length-2)){
		
		case 'q' :
			sock.close();
			return;

		case 'hi' : 
			sock.write(">Hi, how are you!!\r\n");
			break;
		case 'date?' : 
			sock.write(">Today's date is : "+ Date()+"\r\n");
			break;
		case 'time?' : 
			sock.write(">Time  now is : " + Date()+ "\r\n");
			break;
		case 'send mail' :
			sock.write(">Plese share email ID\r\n");
			break;

		default : sock.write("Sorry that does not make sense to me, try again of type q to quit.\r\n");
				
	}
      
        
    });
    
    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });
    
}).listen(6969);

console.log('Server listening on : 6969');

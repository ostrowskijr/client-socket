import readlineSync from 'readline-sync';
import readline from 'readline';
import { WebSocket } from "ws";

//const HOST = process.env.HOST || "127.0.0.1";
//const PORT = process.env.PORT || 8080;

const hostName = readlineSync.question('Informe o endereço do Host:Port - WebSocket? ');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const clientSocket = new WebSocket(hostName);

clientSocket.on('error', (err: Error) => console.log(`Error on client web socket connection: ${err}`));

clientSocket.on('open', () => {
    console.log(`Client to connect on server socket!`);
    clientSocket.send('Connection on server to Open!');
    //
    rl.addListener('line', (line: string) => clientSocket.send(line));
});

clientSocket.on('message', (data: String) => {
    console.log(`Received on server socket: ${data}`);
});

export { clientSocket };
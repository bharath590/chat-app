const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 8080;


app.get('/',(req,res)=>{
    res.render('index.ejs');
})

io.sockets.on('connection',(socket)=>{
    console.log("@@@@@@@@@@@@@@@@@@@@",socket);
    socket.on('username', (username)=>{
        console.log("@@@@@@@@@@@@@@@@@@@@#######",username);
        socket.username = username;
        io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
    })
    socket.on('disconnect', function(username) {
        io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
    })
    socket.on('chat_message', function(message) {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });
})

const server = http.listen(PORT, function () {
    console.log('listening on *:' + PORT);
});
const express = require('express')
const http=require('http')
const socketio=require('socket.io') // return a function

const app=express() //it create express application
const server=http.createServer(app) // creating http server using express application
const io= socketio(server)

// io.on means when a client is connected to http server 
// I listen on the connection event for incoming sockets and log it to the console

let user={}
let SocketMap={}

io.on('connection',(socket)=>{
    console.log('connected with socket id = ',socket.id)
    
    // varify
    function check(data){
         
        if(user[data.username]){
            if(user[data.username]==data.password){
                 socket.emit('login_sucessful')
                 return 1;    
            }else{
                socket.emit('login_failed')
                return 0;
            } 

        }else{
             user[data.username]=data.password
             socket.emit('login_sucessful')
             return 1;
        }
    }
    socket.on('varify_login', (data)=>{
       // console.log(data.username+' '+data.password)  
        let k=check(data);
        if(k==1){
            SocketMap[data.username]=socket.id
        }

    })
    
    
    
    
    
    
    socket.on('disconnect',(socket)=>{
        console.log('user is disconnected ')
    })

    socket.on('chat',data=>{
        //console.log('message is '+msg)
        if(SocketMap[data.to]){
            socket.broadcast.to(SocketMap[data.to]).emit('message',data.msg)            
        }
        else
        socket.broadcast.emit('message',data.msg)
    })
})



app.use('/',express.static(__dirname+'/public'))

 
server.listen(3000,()=>{
    console.log('Started on http://localhost:3000')
})
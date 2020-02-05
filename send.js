const express = require('express');
const app = express();
const amqp = require('amqplib/callback_api');
const port = 4000;
 
amqp.connect('amqp://localhost',(err,conn)=>{
    conn.createChannel((err,ch) =>{
        var queue = 'FirstQueue';
        var message = {type: '2', content:'Hello World'};

        ch.assertQueue(queue,{durable: false});
        ch.sendToQueue(queue,Buffer.from(JSON.stringify(message)));
        console.log(`message was sent`);
        
    });
    setTimeout(()=>{
        conn.close();
        process.exit(0); }, 500)

});

app.listen(port,(req,res)=>{
    console.log("listening at port 4000");
    
});
